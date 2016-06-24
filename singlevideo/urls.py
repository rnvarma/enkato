from django.conf.urls import url
from django.contrib import admin

from singlevideo.views import *

urlpatterns = [
    url(r'^v/(?P<v_id>[a-zA-Z0-9_.-]+)$', SingleVideoPage.as_view()),
]