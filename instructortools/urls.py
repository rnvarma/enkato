from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'1/instructoranalytics$', InstructorAnalyticsView.as_view({'get': 'general'})),
    url(r'1/instructoranalytics/detailed$', InstructorAnalyticsView.as_view({'get': 'detailed'})),
]
