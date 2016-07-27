from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'1/instructoranalytics$', InstructorAnalyticsView.as_view()),
]
