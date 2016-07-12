from django.conf.urls import url
from django.contrib import admin

from series.views import *

urlpatterns = [
    url(r'^createseries$', CreateSeries.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)$', SeriesPage.as_view())
]