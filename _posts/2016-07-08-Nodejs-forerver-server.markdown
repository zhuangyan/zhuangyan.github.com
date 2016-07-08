---
layout: post
title: è¿™æ˜¯ä¸ªæµ‹è¯•é¡µé¢
tags: ["nodejs","æœåŠ¡å™¨"]
---
  Ç°¶ËÍ¬Ñ§Ğ´ÁËÒ»¸önodejsµÄÍøÕ¾£¬ÈÃÎÒ°ïÃ¦¸ø²¿Êğµ½ÎÒÃÇµÄweb·şÎñÆ÷ÉÏ¡£ÎÒÒÔÇ°´ÓÀ´Ã»ÓĞÔÚÉú²ú»·¾³ÉÏ²¿Êğ¹ınodejsµÄ·şÎñ£¬ÕâÌ¨·şÎñÆ÷ÉÏÏÖÔÚÒ²Ö»ÓĞÒ»¸önginx+uwsgiµÄÍøÕ¾ÔÚÔËĞĞ¡£
ºÃÔÚnginx»¹ÊÇºÜ¼òµ¥µÄ£¬Ö±½ÓÔÚnginx.confÀï¼ÓÉÏÒ»¸öserverÅäÖÃ¾Í¿ÉÒÔÁË¡£

{% highlight nginx %}
server { listen 80; server_name mui.zhugyan.cn; location / { proxy_pass http://localhost:3000; } }
{% endhighlight }

È»ºóÔÙÓÃnohupÃüÁîÒÔºóÌ¨ĞÎÊ½Æô¶¯nodejsµÄweb·şÎñ

{% highlight bash %}
nohup node /root/bsml/bin/www &
{% endhighlight }

ÕâÑùnodejs·şÎñ¾Í¿ÉÒÔÍ¨¹ıÓòÃûÀ´·ÃÎÊÁË¡£
