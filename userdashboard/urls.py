from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^1/studentanalytics', StudentAnalyticsViewset.as_view({'get': 'list'})),
]