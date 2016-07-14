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
    (stuSerData, _) = StudentSeriesData.get_or_create(series=series, user=cu)
    return stuSerData

class RecordSeriesVideoView(View):
    def post(self, request):
        s_id = request.POST.get('s_id')
        series = Series.objects.get(uuid=s_id)

        v_id = request.POST.get('v_id')
        video = Video.objects.get(uuid=v_id)

        cu = request.user.customuser
        stuSerData = getStudentSeriesData(series, cu)
        