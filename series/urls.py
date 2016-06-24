from django.conf.urls import url
from django.contrib import admin

from series.views import *

urlpatterns = [
    url(r'^createseries$', CreateSeries.as_view()),
]