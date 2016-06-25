from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.decorators import login_required

from upload.views import *

urlpatterns = [
    url(r'^upload$', login_required(UploadVideo.as_view())),
    url(r'^upload/s/(?P<s_id>[a-zA-Z0-9_.-]+)$', login_required(UploadVideoToSeries.as_view())),
]