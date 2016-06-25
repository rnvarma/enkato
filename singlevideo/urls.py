from django.conf.urls import url
from django.contrib import admin

from singlevideo.views import *

urlpatterns = [
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', SingleVideoPage.as_view()),
    url(r'^1/v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', LoadVideoData.as_view()),
]