from django.conf.urls import url
from django.contrib import admin

from series.views import *

urlpatterns = [
    url(r'^createseries$', CreateSeries.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)$', SeriesPage.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)/subscribe$', SubscribeSeriesPage.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)/unsubscribe$', UnsubscribeSeriesPage.as_view()),
    url(r'^s/(?P<s_id>[a-zA-Z0-9_.-]+)/watch$', SeriesViewerPage.as_view()),
    url(r'^api/series$', SeriesViewset.as_view({'get':'list', 'post':'create'})),
    url(r'^api/series/(?P<uuid>[a-zA-Z0-9_.-]+)$', SeriesViewset.as_view({'get':'retrieve'}))
]