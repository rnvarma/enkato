from django.conf.urls import url, include
from django.contrib import admin
from django.views.decorators.csrf import ensure_csrf_cookie

from authentication.views import *

urlpatterns = [
    url(r'^registeruser$', ensure_csrf_cookie(Register.as_view())),
]