from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from backend.models import *

from backend.views import Serializer

import json

# Create your views here.
class SingleVideoPage(View):
    def get(self, request,v_uuid):
        return render(request, 'singlevideo/singlevideo.html', {'v_uuid':v_uuid})

class AddTopic(View):
    def post(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        time = request.POST.get('currentTime')
        newTopic = Topic(
            name="",
            video=video,
            time=int(time)
        )
        newTopic.save()
        return JsonResponse({'status': True, 'newTopic': Serializer.serialize_topic(newTopic)})

class UpdateTopics(View):
    def post(self, request, v_uuid):
        topics_json = request.POST.get('topics')
        topics = json.loads(topics_json)
        for topic in topics:
            topic_obj = Topic.objects.get(uuid=topic["id"])
            topic_obj.time = topic["time"]
            topic_obj.name = topic["name"]
            topic_obj.save()
        return JsonResponse({'status': True})

class DeleteTopic(View):
    def post(self, request):
        t_uuid = request.POST.get('uuid')
        topic = Topic.objects.get(uuid=t_uuid)
        topic.delete()
        return JsonResponse({'status': True})

class EditVideoTesting(View):
    def get(self, request):
        return render(request, 'edit_video.html')







