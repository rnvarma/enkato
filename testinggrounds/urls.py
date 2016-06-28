from django.conf.urls import url
from django.contrib import admin

from testinggrounds.views import *

urlpatterns = [
    url(r'^quiz_adding_form_wrapper$', QuizAddingFormWrapper.as_view()),
]