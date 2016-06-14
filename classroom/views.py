from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from backend.models import *

class CreateClass(View):
    def get(self, request):
        return render(request, 'classroom/create.html')

    def post(self, request):
        classroom = Classroom(
            name=request.POST.get('name'),
            description=request.POST.get('description')
        )
        classroom.save()
        classroom.creators.add(request.user.customuser)
        return JsonResponse({
            'status': True,
            'c_id': classroom.uuid
        })

class ClassroomPage(View):
    def get(self, request, c_id):
        return render(request, 'classroom/classroom.html', {'c_id': c_id})

class UploadVideoToClass(View):
    def get(self, request, c_id):
        return render(request, 'classroom/upload_video.html', {'c_id': c_id})