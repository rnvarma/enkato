from django.conf.urls import url
from django.contrib import admin

from backend.views import *

urlpatterns = [
    url(r'^1/userdata$', UserData.as_view()),
    url(r'^1/c/(?P<c_id>[a-zA-Z0-9_.-]+)$', ClassroomData.as_view())
]