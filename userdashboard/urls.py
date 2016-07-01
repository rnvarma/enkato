from django.conf.urls import url
from django.contrib import admin

from userdashboard.views import *

urlpatterns = [
    url(r'^user_dashboard$', UserDashboard.as_view()),
] 