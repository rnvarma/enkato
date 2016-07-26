from django.conf.urls import url, include
from django.contrib import admin

from authentication.views import *

urlpatterns = [
    url(r'^registeruser$', Register.as_view()),
]