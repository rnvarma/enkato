from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from backend.models import *
from backend.utility import *

class Serializer(object):
    @staticmethod
    def serialize_user(user):
        data = {}
        data["username"] = user.username
        data["user_id"] = user.id
        data["name"] = capitalize(user.first_name) + " " + capitalize(user.last_name)
        return data

    @staticmethod
    def serialize_userprofiledata(user):
        data = {}
        data["username"] = user.username
        data["user_id"] = user.id
        data["name"] = capitalize(user.first_name) + " " + capitalize(user.last_name)
        data["bio"] = user.bio
        data["image"] = user.image
        return data

    @staticmethod
    def serialize_class(cls):
        data = {}
        data["name"] = cls.name
        data["description"] = cls.description
        data["is_private"] = cls.is_private
        data["creators"] = map(Serializer.serialize_user, cls.creators.all())
        return data

    @staticmethod
    def serialize_series(series):
        data = {}
        data["uuid"] = series.uuid
        data["name"] = series.name
        data["description"] = series.description
        data["image"] = series.image
        data["creator"] = Serializer.serialize_user(series.creator)
        data["num_videos"] = len(series.videos.all())
        data["thumbnails"] = getSeriesThumbnails(series)
        series_videos = series.videos.all().order_by("order")
        total_time = 0
        for series_video in series_videos:
            series_video.video.order = series_video.order
            total_time += series_video.video.duration
        data["total_len"] = sanetizeTime(total_time)
        videos = map(lambda sv: sv.video, series_videos)
        data["videos"] = map(Serializer.serialize_video, videos)
        return data

    @staticmethod
    def serialize_video(video):
        data = {}
        data["uuid"] = video.uuid
        data["timestamp"] = video.timestamp
        data["source"] = video.source
        data["vid_id"] = video.vid_id
        data["name"] = video.name
        data["description"] = video.description
        data["thumbnail"] = video.thumbnail
        data["duration_raw"] = video.duration
        data["duration_clean"] = convertSecondsToTime(video.duration)
        data["duration_san"] = sanetizeTime(video.duration)
        data["creator"] = Serializer.serialize_user(video.creator)
        data["num_views"] = video.num_views
        data["order"] = video.order if 'order' in video.__dict__ else 0
        data["num_topics"] = video.topics.count()
        data["num_quiz_questions"] = video.quiz_questions.count()
        return data

    @staticmethod
    def serialize_topic(topic):
        data = {}
        data["name"] = topic.name
        data["time"] = topic.time
        data["time_clean"] = convertSecondsToTime(topic.time)
        data["id"] = topic.uuid
        data["isCurrentTopic"] = False #used in frontend
        return data

    @staticmethod
    def serialize_quiz_question(quizQ):
        data = {}
        data["shouldRefocus"] = False
        data["currentFocus"] = 0
        data["active"] = False
        data["quizQuestionText"] = quizQ.question_text
        data["new"] = False
        data["choiceList"] = map(Serializer.serialize_quiz_choice, quizQ.mc_responses.all())
        data["id"] = quizQ.id
        return data

    @staticmethod
    def serialize_quiz_choice(choice):
        data = {}
        data["text"] = choice.choice_text
        data["id"] = choice.id
        data["is_correct"] = choice.is_correct
        return data

class UserData(APIView):
    def get(self, request):
        if request.user.is_anonymous():
            data = {
                'logged_in': False
            }
        else:
            cu = request.user.customuser
            data = Serializer.serialize_user(cu)
            data["logged_in"] = True
        return Response(data)

class UserProfileData(APIView):
    def get(self, request, u_id):
        cu = CustomUser.objects.get(id=u_id)
        data = {}
        data["userdata"] = Serializer.serialize_userprofiledata(cu)
        data["series"] = map(Serializer.serialize_series, cu.created_series.all())
        return Response(data)

class ClassroomData(APIView):
    def get(self, request, c_id):
        classroom = Classroom.objects.get(uuid=c_id)
        class_data = Serializer.serialize_class(classroom)
        return Response(class_data)

class SeriesData(APIView):
    def get(self, request, s_id):
        series = Series.objects.get(uuid=s_id)
        series_data = Serializer.serialize_series(series)
        return Response(series_data)

class VideoData(View):
    def get(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        topicList = video.topics.all().order_by('time')
        frontendTList = map(Serializer.serialize_topic, topicList)
        return JsonResponse({
            'videoID':video.vid_id,
            'topicList':frontendTList,
            'videoData': Serializer.serialize_video(video)
        })

class QuizData(APIView):
    def get(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        quizQs = video.quiz_questions.all()
        questions = map(Serializer.serialize_quiz_question, quizQs)
        return JsonResponse({
            'questions': questions,
            'numQuestions': quizQs.count()
        })


