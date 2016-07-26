from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'1/questions$', QuestionViewset.as_view({'get':'list', 'post':'create'})),
    url(r'1/questions/(?P<pk>[0-9]+)$', QuestionViewset.as_view({'get':'retrieve', 'delete':'destroy', 'patch':'partial_update'})),
    url(r'1/responses$', QuestionResponseViewset.as_view({'get':'list', 'post':'create'})),
    url(r'1/responses/(?P<pk>[0-9]+)$', QuestionResponseViewset.as_view({'get':'retrieve', 'delete':'destroy', 'patch':'partial_update'})),
]