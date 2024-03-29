"""reactapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
import notifications.urls
from rest_framework.authtoken.views import obtain_auth_token
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^admin', admin.site.urls),
    url(r'^obtain-auth-token/?$', csrf_exempt(obtain_auth_token)),
    url(r'^', include('analytics.urls')),
    url(r'^', include('authentication.urls')),
    url(r'^', include('backend.urls')),
    url(r'^', include('userprofile.urls')),
    url(r'^', include('singlevideo.urls')),
    url(r'^', include('upload.urls')),
    url(r'^', include('series.urls')),
    url(r'^', include('userdashboard.urls')),
    url(r'^', include('testinggrounds.urls')),
    url(r'^', include('instructortools.urls')),
    url(r'^', include('questionanswer.urls')),
    url(r'^', include('home.urls')),
    url(r'^', include(notifications.urls, namespace='notifications')),
]
