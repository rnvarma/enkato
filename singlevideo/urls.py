from django.conf.urls import url
from django.contrib import admin

from singlevideo.views import *

urlpatterns = [
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', SingleVideoPage.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/addtopic$', AddTopic.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/updatetopics$', UpdateTopics.as_view()),
    url(r'^deletetopic$', DeleteTopic.as_view()),
    url(r'editvideo$', EditVideoTesting.as_view())
]