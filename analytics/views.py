from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from backend.models import *
from backend.utility import *

def getStudentSeriesData(series, cu):
    (ssData, _) = StudentSeriesData.objects.get_or_create(series=series, user=cu)
    return ssData

def getStudentSeriesVideoData(ssData, video):
    (ssvData, _) = StudentSeriesVideoData.objects.get_or_create(ss_data=ssData, video=video)
    return ssvData

class RecordSingleVideoView(View):
    def post(self, request):
        pass

class RecordSeriesVideoView(View):
    def post(self, request, s_id):
        series = Series.objects.get(uuid=s_id)

        v_id = request.POST.get('v_id')
        video = Video.objects.get(uuid=v_id)

        cu = request.user.customuser
        ssData = getStudentSeriesData(series, cu)
        ssvData = getStudentSeriesVideoData(ssData, video)

        video_duration = video.duration
        view_duration = int(request.POST.get('duration')) / 1000 # in milliseconds 
        end = int(float(request.POST.get('end')))

        ssvData.num_views += 1
        ssvData.total_time_watched += view_duration
        ssvData.seconds_into_video = end
        if ssvData.seconds_into_video > 0.9 * video_duration:
            ssvData.watched = True

        if view_duration > (0.1 * video_duration) or view_duration > 30:
            video.num_views += 1

        ssvData.save()
        video.save()

        return JsonResponse({
            'status': True,
            'watched': ssvData.watched,
            'numViews': video.num_views,
            'total_time_watched': ssvData.total_time_watched,
            'name': video.name
        })



class LogQuiz(View):
    def post(self, request, s_id, v_uuid):
        s = Series.objects.get(uuid=s_id)
        ssd = StudentSeriesData.objects.get(user=request.user.customuser, series=s)

        v = Video.objects.get(uuid=v_uuid)
        ssvd = StudentSeriesVideoData.objects.get(ss_data=ssd, video=v)
        return JsonResponse({"success":True})


