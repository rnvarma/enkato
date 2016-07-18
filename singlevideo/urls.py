from django.conf.urls import url

from singlevideo.views import *

urlpatterns = [
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', SingleVideoPage.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/addtopic$', AddTopic.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/updatetopics$', UpdateTopics.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/updatequiz$', UpdateQuiz.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/addquizquestion$', AddQuizQuestion.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/deletequizquestion$', DeleteQuizQuestion.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/addquizoption$', AddQuizOption.as_view()),
    url(r'^v/(?P<v_uuid>[a-zA-Z0-9_.-]+)/deletequizoption$', DeleteQuizOption.as_view()),
    url(r'^deletetopic$', DeleteTopic.as_view()),
    url(r'editvideo$', EditVideoTesting.as_view()),
    url(r'api/videos/(?P<v_uuid>[a-zA-Z0-9_.-]+)/questions$', QuestionViewset.as_view({'get':'list', 'post':'create'})),
    url(r'api/videos/(?P<v_uuid>[a-zA-Z0-9_.-]+)/questions/(?P<pk>[0-9]+)$', QuestionViewset.as_view({'get':'retrieve', 'delete':'destroy', 'patch':'partial_update'})),
    url(r'api/videos/(?P<v_uuid>[a-zA-Z0-9_.-]+)/responses$', QuestionResponseViewset.as_view({'get':'list', 'post':'create'})),
    url(r'api/videos/(?P<v_uuid>[a-zA-Z0-9_.-]+)/responses/(?P<pk>[0-9]+)$', QuestionResponseViewset.as_view({'get':'retrieve', 'delete':'destroy', 'patch':'partial_update'})),
]
