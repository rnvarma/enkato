from django.conf.urls import url

from backend.views import *

urlpatterns = [
    url(r'^1/userdata$', UserData.as_view()),
    url(r'^1/c/(?P<c_id>[a-zA-Z0-9_.-]+)$', ClassroomData.as_view()),
    url(r'^1/s/(?P<s_id>[a-zA-Z0-9_.-]+)$', SeriesData.as_view()),
    url(r'^1/v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', VideoData.as_view()),
    url(r'^1/userprofile/(?P<u_id>[a-zA-Z0-9_.-]+)$', UserProfileData.as_view()),
    url(r'^api/quizdata/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', QuizData.as_view()),
    url(r'^api/video/(?P<v_uuid>[a-zA-Z0-9_.-]+)/questions$', QuestionData.as_view()),
    url(r'^api/TYIndexScript/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', YTIndexScript.as_view()),
    url(r'^api/quiz/s/(?P<s_id>[a-zA-Z0-9_.-]+)/v/(?P<v_id>[a-zA-Z0-9_.-]+)$', LoadQuizData.as_view()),
]
