from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'api/videos/(?P<v_uuid>[a-zA-Z0-9_.-]+)/questions$', QuestionViewset.as_view({'get':'list', 'post':'create'})),
    url(r'api/videos/(?P<v_uuid>[a-zA-Z0-9_.-]+)/questions/(?P<pk>[0-9]+)$', QuestionViewset.as_view({'get':'retrieve', 'delete':'destroy', 'patch':'partial_update'})),
    url(r'api/responses$', QuestionResponseViewset.as_view({'get':'list', 'post':'create'})),
    url(r'api/responses/(?P<pk>[0-9]+)$', QuestionResponseViewset.as_view({'get':'retrieve', 'delete':'destroy', 'patch':'partial_update'})),
]