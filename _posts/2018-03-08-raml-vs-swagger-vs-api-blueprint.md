---
layout: post
title: 三大API设计工具对比
tags: ["raml","swagger","api-blueprint"]
---

API设计工具中常常会拿RAML、Swagger、API-Blueprint这三种工具进行讨论比较，它们都是用来描述和辅助API开发的，只是它们之间的侧重有所不同。

## 社区比较

RAML: 

<iframe src="https://ghbtns.com/github-btn.html?user=raml-org&repo=raml-spec&type=star&count=true&size=large&v=2" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

Swagger: 

<iframe src="https://ghbtns.com/github-btn.html?user=swagger-api&repo=swagger-ui&type=star&count=true&size=large&v=2" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

API-Blueprint: 
<iframe src="https://ghbtns.com/github-btn.html?user=apiaryio&repo=api-blueprint&type=star&count=true&size=large&v=2" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

## 书写格式

* RAML:　YAML
* SWAGGER : JSON
* API-Blueprint : MarkDown

## 文档生成

* RAML:　raml2html生成html
* SWAGGER : SwaggerToHtml,Swagger2pdf
* API-Blueprint : aglio生成html


## 代码生成

* RAML:　https://raml.org/developers/build-your-api，支持java,node,.net,python等语言
* SWAGGER : https://swagger.io/swagger-codegen/，大部分流行语言都支持
* API-Blueprint : 没找到


