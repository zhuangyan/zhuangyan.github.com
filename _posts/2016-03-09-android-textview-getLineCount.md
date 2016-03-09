---
layout: post
title: Android实现类似朋友圈显示全文的功能
---
    项目中要实现一个类似朋友圈显示收起全文的功能，这个功能看起来简单，但对于我这个新手来说确实费了些时间。

    首先，在adpter_item.xml中定义textview的lines="3",然后定义个“全文”按钮，默认不显示，如下：
    {% highlight java %}
    <TextView
        android:id="@+id/contentTv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingBottom="5dip"
        android:paddingTop="5dip"
        android:ellipsize="end"
        android:lines="3"
        android:textColor="@color/color_232323"
        android:textSize="14sp" />
    <TextView
        android:id="@+id/showAllTv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingBottom="5dip"
        android:paddingTop="5dip"
        android:textColor="@color/bule_02"
        android:text="全文"
        android:visibility="gone"
        android:textSize="14sp" />
    {% endhighlight %}

    重点就是，怎样判断当前的textview里的全部文字是不是能够显示三行以上，再把showAllTv显示出来呢？textview确实有个getLineCount方法可以获得显示的行数，但是这个值只能控件绘画后才能获取，Adapter的getView中获得的行数全部为0，因为控件还没有绘画。我在百度之后发现以下方法是比较靠谱的，就是对textview的绘画事件进行监听，在绘画完成前判断行数并修改相关控件属性，代码如下：

    {% highlight java %}
        final TextView fContentTv = holder.contentTv;
        final TextView fShowAllTv = holder.showAllTv;
        ViewTreeObserver vto =fContentTv.getViewTreeObserver();
        vto.addOnPreDrawListener(new ViewTreeObserver.OnPreDrawListener() {
                                     @Override
                                     public boolean onPreDraw() {
                                         int lineCount = fContentTv.getLineCount();
                                         Log.i(TAG, "onPreDraw: "+ lineCount);
                                         if(lineCount>3&&fShowAllTv.getText().equals("全文")){
                                             fContentTv.setLines(3);
                                             fShowAllTv.setVisibility(View.VISIBLE);
                                         }
                                         return true;
                                     }
                                 }
        );

        fShowAllTv.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                if (fShowAllTv.getText().equals("全文")){
                    fContentTv.setText(content);
                    fContentTv.setEllipsize(null);
                    fShowAllTv.setText("收起");
                    fContentTv.setSingleLine(false);
                }else{
                    fContentTv.setLines(3);
                    fContentTv.setEllipsize(TextUtils.TruncateAt.END);
                    fShowAllTv.setText("全文");
                }
            }
        });
    {% endhighlight %}



