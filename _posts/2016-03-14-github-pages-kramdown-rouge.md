---
layout: post
title: GitHub Pages更新Markdown的解释器及语法高亮库
---
今天发现邮箱里有github发送给我的"Page build warning"标题的邮件，邮件内容说我用的语法高亮库“pygments”和Markdown的解释器“redcarpet”以后都将不再支持了，需要更新为“rouge”和“kramdown”。

>You are currently using the 'redcarpet' Markdown engine, which will not be supported on GitHub Pages after May 1st. At that time, your site will use 'kramdown' for markdown rendering instead. To suppress this warning, remove the 'markdown' setting in your site's '_config.yml' file and confirm your site renders as expected. For more information, see https://help.github.com/articles/updating-your-markdown-processor-to-kramdown.

>You are attempting to use the 'pygments' highlighter, which is currently unsupported on GitHub Pages. Your site will use 'rouge' for highlighting instead. To suppress this warning, change the 'highlighter' value to 'rouge' in your '_config.yml'. For more information, see https://help.github.com/articles/page-build-failed-config-file-error/#fixing-highlighting-errors.

升级很简单，根据说明把配置文件改了就可以。rouge是完全和pygments兼容的，kramdown的<a href="http://kramdown.gettalong.org/syntax.html" target="_blank">语法</a>我以后再熟悉一下。


