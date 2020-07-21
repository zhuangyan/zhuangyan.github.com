---
layout: post
title: Elastic Stack介绍及在docker下安装
tags: ["dokcer","elk"]
---


&emsp;&emsp;系统运维和开发人员可以通过日志了解服务器软硬件信息、检查配置过程中的错误及错误发生的原因。经常分析日志可以了解服务器的负荷，性能安全性，从而及时采取措施纠正错误。
通常，日志被分散的储存不同的设备上。如果你管理数十上百台服务器，你还在使用依次登录每台机器的传统方法查阅日志。这样是不是感觉很繁琐和效率低下。
当务之急我们使用集中化的日志管理，例如：开源的 syslog ，将所有服务器上的日志收集汇总。
集中化管理日志后，日志的统计和检索又成为一件比较麻烦的事情，一般我们使用 grep 、 awk和 wc 等 Linux 命令能实现检索和统计，
但是对于要求更高的查询、排序和统计等要求和庞大的机器数量依然使用这样的方法难免有点力不从心。
开源实时日志分析平台 Elastic Stack（旧称ELK Stack）能够完美的解决我们上述的问题， ELK 由 ElasticSearch 、 Logstash 和 Kiabana 三个开源工具组成。

## 🌩️体系架构
<img src="/static/img/2020/elk01.png" title="体系架构"/>

## 🌩️下载相关的docker镜像
~~~
docker pull elasticsearch:7.8.0
docker pull kibana:7.8.0
docker pull logstash:7.8.0
~~~

## 🌩️修改系统配置

修改/etc/security/limits.conf ，添加如下内容：
~~~
      * soft nofile 65536
      * hard nofile 65536
~~~
nofile是单个进程允许打开的最大文件个数 soft nofile 是软限制 hard nofile是硬限制

修改/etc/sysctl.conf，追加内容

~~~
    vm.max_map_count=655360
~~~
    vm.max_map_count是限制一个进程可以拥有的VMA(虚拟内存区域)的数量

执行下面命令 修改内核参数马上生效，之后重启服务器和docker服务
~~~
sysctl ‐p
~~~

## 🌩️安装elasticsearch
创建一个elk文件夹, 后面的elk日志采集系统的配置文件都放在这里面

~~~
mkdir /home/elk
~~~

创建elasticsearch配置文件
~~~
vi /home/elk/elasticsearch.yml
~~~
在里面添加如下配置：

~~~
cluster.name: "docker-cluster"
network.host: 0.0.0.0
# 访问ID限定，0.0.0.0为不限制，生产环境请设置为固定IP
transport.host: 0.0.0.0
# elasticsearch节点名称
node.name: node-1
# elasticsearch节点信息
cluster.initial_master_nodes: ["node-1"]
# 下面的配置是关闭跨域验证（可以不开启）
http.cors.enabled: true
http.cors.allow-origin: "*"
~~~

创建并启动elasticsearch容器

~~~
docker run -di -p 9200:9200 -p 9300:9300 --name=elasticsearch -v /home/elk/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml elasticsearch:7.8.0
~~~
之后通过9200端口在浏览器上访问（需要开启外网访问权限），有信息返回则成功；，像下面的信息：

~~~
{
  "name" : "node-1",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "hgi5vLs5Q1qjdTC-cb6hVg",
  "version" : {
    "number" : "7.8.0",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "757314695644ea9a1dc2fecd26d1a43856725e65",
    "build_date" : "2020-06-14T19:35:50.234439Z",
    "build_snapshot" : false,
    "lucene_version" : "8.5.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

~~~


## 🌩️安装kibana

kibana主要用于对elasticsearch的数据进行分析查看。注意选择的版本必须和elasticsearch的版本相同或者低，建议和elasticsearch的版本相同，否则会无法将无法使用kibana。

创建配置文件
~~~
vi /home/elk/kibana.yml
~~~
在里面编写如下配置：
~~~
server.port: 5601
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://elasticsearch的IP:9200"]
# 操作界面语言设置为中文
i18n.locale: "zh-CN"
~~~

创建并启动kibana容器
~~~
docker run -di --name kibana -p 5601:5601 -v /home/elk/kibana.yml:/usr/share/kibana/config/kibana.yml kibana:7.8.0
~~~
启动成功后访问5601端口即可进入kibana管理界面。（进入后要求选择配置，直接选择自己浏览即可）

## 🌩️安装logstash
logstash会将收到的日志信息推送到elasticsearch中

创建配置文件
~~~
vi /home/elk/logstash.yml
~~~
在里面添加如下配置：
~~~
## Default Logstash configuration from Logstash base image.
### https://github.com/elastic/logstash/blob/master/docker/data/logstash/config/logstash-full.yml
http.host: "0.0.0.0"
xpack.monitoring.elasticsearch.hosts: [ "http://10.1.1.101:9200" ]
#elasticsearch 这里写的是你的ip
## X-Pack security credentials
#xpack.monitoring.enabled: true
#xpack.monitoring.elasticsearch.username: elastic
#xpack.monitoring.elasticsearch.password: changeme
~~~
创建配置文件：
~~~
mkdir /home/elk/pipeline
vi /home/elk/pipeline/logstash.conf
~~~
内容如下：
~~~
input {
        tcp {
                port => 5044
        }
}
## Add your filters / logstash plugins configuration here
output {
        elasticsearch {
                hosts => ["http://10.1.1.101:9200"]
        }
} 

~~~

创建和启动logstash容器
~~~
docker run -di -p 5044:5044 -v /home/elk/pipeline/:/usr/share/logstash/pipeline/ -v /home/elk/logstash.yml:/usr/share/logstash/config/logstash.yml --name logstash logstash:7.8.0
~~~




## 🌩️在python程序中记录日志到logstash

~~~
pip install python-logstash
~~~

~~~py
import logging
import logstash
import sys

host = '10.1.1.101'

test_logger = logging.getLogger('python-logstash-logger')
test_logger.setLevel(logging.INFO)
# test_logger.addHandler(logstash.LogstashHandler(host, 5959, version=1))
test_logger.addHandler(logstash.TCPLogstashHandler(host, 5044, version=1))

test_logger.error('python-logstash: test logstash error message.')
test_logger.info('python-logstash: test logstash info message.')
test_logger.warning('python-logstash: test logstash warning message.')

# add extra field to logstash message
extra = {
    'test_string': 'python version: ' + repr(sys.version_info),
    'test_boolean': True,
    'test_dict': {'a': 1, 'b': 'c'},
    'test_float': 1.23,
    'test_integer': 123,
    'test_list': [1, 2, '3'],
}
test_logger.info('python-logstash: test extra fields', extra=extra)
~~~

在kibana上查看的测试日志如下：

<img src="/static/img/2020/elk02.png" title="kibana"/>
