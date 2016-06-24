from django.conf.urls import url
from django.contrib import admin

from upload.views import *

urlpatterns = [
    url(r'^upload$', UploadVideo.as_view()),
]