---
layout: post
title: Optional Django Apps
tags:
- python
- django
- hacks
---

A project of mine contains a number of third-party apps that are development
related and potentially not available on every machine the project will run
on. My general approach to dealing with these was to try and import the app in
my `settings` module and if successful, add it to the `INSTALLED_APPS`
setting. However as the number of these apps grew it became a wart within the
settings module so I put together this snippet for managing them.

We first create a sequence of dictionaries, each containing information about
an installed app such as the module to try and import, an extra potential
condition for checking and then the sequences of names to add to
`INSTALLED_APPS`, `MIDDLEWARE_CLASSES` and `TEMPLATE_CONTEXT_PROCESSORS`.
Let's start with the settings for optionally including the apps [django-
command-extensions](http://github.com/django-extensions/django-extensions),
[django-debug-toolbar](http://github.com/robhudson/django-debug-toolbar) and
[south](http://south.aeracode.org).

{% highlight python %}
# Define any settings specific to each of the optional apps.
import sys
USE_SOUTH = not (len(sys.argv) > 1 and sys.argv[1] == "test")
DEBUG_TOOLBAR_CONFIG = {"INTERCEPT_REDIRECTS": False}

# Sequence for each optional app as a dict containing info about the app.
OPTIONAL_APPS = (
    {"import": "django_extensions", "apps": ("django_extensions",)},
    {"import": "debug_toolbar", "apps": ("debug_toolbar",),
        "middleware": ("debug_toolbar.middleware.DebugToolbarMiddleware",)},
    {"import": "south", "apps": ("south",), "condition": USE_SOUTH},
)
{% endhighlight %}

Next we simply iterate through the sequence of optional apps and set them up.

{% highlight python %}
# Set up each optional app if available.
for app in OPTIONAL_APPS:
    if app.get("condition", True):
        try:
            __import__(app["import"])
        except ImportError:
            pass
        else:
            INSTALLED_APPS += app.get("apps", ())
            MIDDLEWARE_CLASSES += app.get("middleware", ())
{% endhighlight %}
