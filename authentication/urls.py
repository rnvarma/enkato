from django.conf.urls import url, include
from django.contrib import admin

from authentication.views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^registeruser$', csrf_exempt(Register.as_view())),
]