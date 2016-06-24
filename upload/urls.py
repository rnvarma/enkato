from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.decorators import login_required

from upload.views import *

urlpatterns = [
    url(r'^upload$', login_required(UploadVideo.as_view())),
]