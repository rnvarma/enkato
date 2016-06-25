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
        data["name"] = series.name
        data["description"] = series.description
        data["image"] = series.image
        data["creator"] = Serializer.serialize_user(series.creator)
        data["num_videos"] = len(series.videos.all())
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



