from django.conf.urls import url
from django.contrib import admin

from series.views import *

urlpatterns = [
    url(r'^createseries$', CreateSeries.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)/subscribe$', SubscribeSeriesPage.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)/unsubscribe$', UnsubscribeSeriesPage.as_view()),
    url(r'^1/series$', SeriesViewset.as_view({'get': 'list', 'post': 'create'})),
    url(r'^1/series/(?P<uuid>[a-zA-Z0-9_.-]+)$', SeriesViewset.as_view({'get': 'retrieve', 'delete': 'destroy', 'patch': 'partial_update'})),
    url(r'^setseriesprivacy$', SetSeriesPrivacy.as_view()),
]