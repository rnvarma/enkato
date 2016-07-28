from django.conf.urls import url

from backend.views import *

urlpatterns = [
    url(r'^1/userdata$', UserData.as_view()),
    #url(r'^1/userdashboard$', UserDashboardData.as_view()),
    url(r'^1/c/(?P<c_id>[a-zA-Z0-9_.-]+)$', ClassroomData.as_view()),
    url(r'^1/curatedseries$', CuratesSeries.as_view()),
    url(r'^1/s/(?P<s_id>[a-zA-Z0-9_.-]+)$', SeriesData.as_view()),
    url(r'^2/s/(?P<v_id>[a-zA-Z0-9_.-]+)$', SeriesVideoData.as_view()),
    url(r'^1/v/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', VideoData.as_view()),
    url(r'^1/userprofile$', UserProfileData.as_view()),
    url(r'^1/userprofile/(?P<u_id>[a-zA-Z0-9_.-]+)$', UserProfileData.as_view()),
    url(r'^1/quizdata/(?P<v_uuid>[a-zA-Z0-9_.-]+)$', QuizData.as_view()),
    url(r'^2/v/(?P<v_id>[a-zA-Z0-9_.-]+)$', VideoIdData.as_view()),
    url(r'^1/studentquizdata/s/(?P<s_id>[a-zA-Z0-9_.-]+)/v/(?P<v_id>[a-zA-Z0-9_.-]+)$', LoadQuizData.as_view()),
    url(r'^1/users/current$', UserViewset.as_view({'get':'retrieve'})),
    url(r'^1/users$', UserViewset.as_view({'get':'list'})),
    url(r'^parseimporttopics$', ParseImportTopics.as_view()),
]

