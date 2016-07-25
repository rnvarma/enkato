from django.conf.urls import url

from analytics.views import *

urlpatterns = [
    url(r'^trackview/s/(?P<s_id>[a-zA-Z0-9_.-]+)$', RecordSeriesVideoView.as_view()),
    url(r'^logquiz/s/(?P<s_id>[a-zA-Z0-9_.-]+)/v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', LogQuiz.as_view())
]