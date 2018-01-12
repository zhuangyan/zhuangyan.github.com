---
layout: post
title: BootstrapValidator使用指南
tags: ["bootstrap","validator]"]
---

因为项目需要数据验证，看bootstrapValidator还不错,虽然作者在2014年就不更新,去推广自己的收费组件formvalidation了.但是我没有找到更合适的免费组件,就用这个了.下面总结一下用法.



### 源码和API文档
{% highlight html %}

bootstrapvalidator源码：https://github.com/nghuuphuoc/bootstrapvalidator
boostrapvalidator api：http://bootstrapvalidator.votintsev.ru/api/
{% endhighlight %}



### 引入文件

来看bootstrapvalidator的描述：A jQuery form validator for Bootstrap 3。从描述中我们就可以知道它至少需要jQuery、bootstrap的支持。我们首先引入需要的js组件

{% highlight html %}
　　 <script src="/scripts/jquery-1.10.2.js"></script>

    <script src="/bootstrap/js/bootstrap.min.js"></script>
    <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <script src="/bootstrapValidator/js/bootstrapValidator.min.js"></script>
    <link href="/bootstrapValidator/css/bootstrapValidator.min.css" rel="stylesheet" />

{% endhighlight %}

### 表单HTML

在表单中，若对某一字段想添加验证规则，默认需要以<div class=”form-group”></div>包裹（对应错误提示会根据该class值定位），内部&lt;	input class="form-control" /&gt;标签必须有name属性值，此值为验证匹配字段。

{% highlight html %}
　　　　　<form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" name="username" />
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control" name="email" />
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
{% endhighlight %}

### 验证规则

#### 添加到js上
{% highlight javascript %}
    $(function () {
        $('form').bootstrapValidator({
            message: 'This value is not valid',
                feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
                },
            fields: {
                username: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱地址不能为空'
                        }
                    }
                }
            }
        });
    });


{% endhighlight %}

#### 添加到html上

{% highlight html %}
　　　　　<form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" name="username" 
                data-bv-message="用户名不合法"
                required
                data-bv-notempty-message="用户名不能为空"
                pattern="[a-zA-Z0-9]+"
                data-bv-regexp-message="用户名只能包含字母和数字"/>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control" name="email" 
                required
                data-bv-notempty-message="Email不能为空"/>
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
{% endhighlight %}

### 定义自定义验证规则

该规则是拓展插件的validators方法。 
我将项目中常用的方法放到了一个单独js中，也就是上面第一步引用的自定义方法。

使用方法如下：

{% highlight javascript %}
(function($) {
    //自定义表单验证规则
    $.fn.bootstrapValidator.validators = {
        <validatorName> : {
            /**
             * @param {BootstrapValidator} 表单验证实例对象
             * @param {jQuery} $field jQuery 对象
             * @param {Object} 表单验证配置项值
             * @returns {boolean}
             */
            validate: function(validator, $field, options) {
                // 表单输入的值
                // var value = $field.val();

                //options为<validatorOptions>对象，直接.获取需要的值

                // 返回true/false
                //也可返回{ valid : true/false, message: 'XXXX'}
                return reg.test( $field.val() );

            }
        },
    };
}(window.jQuery));
{% endhighlight %}

### 常用事件
#### 重置某一单一验证字段验证规则
{% highlight html %}

$(formName).data(“bootstrapValidator”).updateStatus("fieldName",  "NOT_VALIDATED",  null );
{% endhighlight %}

#### 重置表单所有验证规则
{% highlight html %}
$(formName).data("bootstrapValidator").resetForm();
{% endhighlight %}

#### 手动触发表单验证
{% highlight html %}

//触发全部验证
$(formName).data(“bootstrapValidator”).validate();
//触发指定字段的验证
$(formName).data(“bootstrapValidator”).validateField('fieldName');
{% endhighlight %}


#### 获取当前表单验证状态
{% highlight html %}

// flag = true/false 
var flag = $(formName).data(“bootstrapValidator”).isValid();
{% endhighlight %}


####　根据指定字段名称获取验证对象
{% highlight html %}

// element = jq对象 / null
var element = $(formName).data(“bootstrapValidator”).getFieldElements('fieldName');
{% endhighlight %}


### 表单提交

#### 当提交按钮是普通按钮 
{% highlight javascript %}

 $("buttonName").on("click", function(){
        //获取表单对象
        var bootstrapValidator = form.data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid()){
            //表单提交的方法、比如ajax提交
        }
});

{% endhighlight %}

#### 当提交按钮的[type=”submit”]时 

会在success之前自动触发表单验证
{% highlight javascript %}

 var bootstrapValidator = form.data('bootstrapValidator');
    bootstrapValidator.on('success.form.bv', function (e) {
        e.preventDefault();
        //提交逻辑
    });
{% endhighlight %}

### 常用验证规则

1.判断字段是否为空

{% highlight html %}
 notEmpty: {
          message: '用户名必填不能为空'
    }
{% endhighlight %}

2.字段长度判断

{% highlight html %}
stringLength: {
          min: 6,
          max: 30,
          message: '用户名长度不能小于6位或超过30位'
   },
{% endhighlight %}

          
3.通过正则表达式进行验证
{% highlight html %}

regexp: {
        regexp: /^[A-Z\s]+$/i,
        message: '名字只能由字母字符和空格组成。'
    }
{% endhighlight %}

                    
4.大小写验证
{% highlight html %}

stringCase: {
        message: '姓氏必须只包含大写字符。',
        case: 'upper'//其他值或不填表示只能小写字符
    },
{% endhighlight %}

                    
5.两个字段不相同的判断
{% highlight html %}

different: {
          field: 'password',
          message: '用户名和密码不能相同。'
        }
{% endhighlight %}

                    
6.email验证
{% highlight html %}

emailAddress: {
            message: 'The input is not a valid email address'
        }
{% endhighlight %}

                   
7.日期格式验证
{% highlight html %}
date: {
         format: 'YYYY/MM/DD',
         message: '日期无效'
                    }
{% endhighlight %}

                    
8.纯数字验证
{% highlight html %}

 digits: {
        message: '该值只能包含数字。'
    }
{% endhighlight %}

    
9.ajax验证
{% highlight html %}

threshold :  6 , //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
        url: 'exist2.do',//验证地址
        message: '用户已存在',//提示消息
        delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
        type: 'POST'//请求方式
    },
{% endhighlight %}

                     
10.复选框验证
{% highlight html %}

choice: {
        min: 2,
        max: 4,
        message: '请选择2-4项'
    }
{% endhighlight %}

                    
11.密码确认
{% highlight html %}
identical: {
        field: 'confirmPassword',
        message: 'The password and its confirm are not the same'
    },
{% endhighlight %}

                    
12.判断输入数字是否符合大于18小于100
{% highlight html %}

greaterThan: {
            value: 18
        },
lessThan: {
            value: 100
        }
{% endhighlight %}

                    
13.uri验证
{% highlight html %}
    uri: {}
{% endhighlight %}

 