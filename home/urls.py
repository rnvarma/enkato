from django.conf.urls import url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt

from home.views import *

urlpatterns = [
    url(r'^$', HomePage.as_view()),
    url(r'^educator$', EducatorPage.as_view()),
    url(r'^interesteduser$', csrf_exempt(InterestedUserRegistration.as_view()))
]