from django.conf.urls import url
from django.contrib import admin

from userprofile.views import *

urlpatterns = [
    url(r'^_user_code_/profile$', LoadProfile.as_view())
]