from django.conf.urls import url
from django.contrib import admin

from userprofile.views import *

urlpatterns = [
    url(r'^1/getnotifications', GetNotifications.as_view()),
    url(r'^1/markasread', MarkAsRead.as_view()),
]