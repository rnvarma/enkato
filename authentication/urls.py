from django.conf.urls import url
from django.contrib import admin

from authentication.views import *

urlpatterns = [
    url(r'^login$', Login.as_view()),
    url(r'^register$', Register.as_view()),
]