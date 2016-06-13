from django.conf.urls import url
from django.contrib import admin

from classroom.views import *

urlpatterns = [
    url(r'^createclass$', CreateClass.as_view()),
    url(r'^c/(?P<c_id>[a-zA-Z0-9_.-]+)', ClassroomPage.as_view())
]