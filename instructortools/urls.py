from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'1/instructoranalytics$', InstructorAnalyticsView.as_view({'get': 'general'})),
    url(r'1/instructoranalytics/detailed$', InstructorAnalyticsView.as_view({'get': 'detailed'})),
    url(r'1/breakpoints', BreakpointViewset.as_view({'post': 'create'})),
    url(r'1/breakpoints/(?P<pk>[0-9]+)$', BreakpointViewset.as_view({'delete': 'destroy', 'patch': 'partial_update'})),
]
