from django.conf.urls import url
from django.contrib import admin

from userprofile.views import *

urlpatterns = [
    url(r'^userprofile$', UserProfile.as_view()),
]