from django.conf.urls import url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt

from home.views import *

urlpatterns = [
    url(r'^.well-known/acme-challenge/LlVITAf22WhAg7BOReBaMjWVL1vAe5yxm_I3w4zqbas$', SSLPage.as_view()),
    url(r'^jobs$', JobsPage.as_view()),
    url(r'^', HomePage.as_view()),
    url(r'^interesteduser$', csrf_exempt(InterestedUserRegistration.as_view()))
]