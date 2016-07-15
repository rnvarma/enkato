from django.conf.urls import url

from analytics.views import *

urlpatterns = [
    url(r'^trackview$', RecordSingleVideoView.as_view()),
    url(r'^trackview/s/(?P<s_id>[a-zA-Z0-9_.-]+)$', RecordSeriesVideoView.as_view()),
]