from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from backend.models import *

# Create your views here.
class SingleVideoPage(View):
    def get(self, request,v_uuid):
        return render(request, 'singlevideo/singlevideo.html', {'v_uuid':v_uuid})

class LoadVideoData(View):
    def get(self, request,v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        topicList = video.topics.all()
        frontendTList = []
        for topic in topicList:
            temp = {}
            temp["name"] = topic.name
            temp["time"] = topic.time
            temp["id"] = topic.uuid
            temp["isCurrentTopic"] = False #used in frontend
            frontendTList.append(temp)
        return JsonResponse({
            'videoID':video.vid_id,
            'topicList':frontendTList
        })