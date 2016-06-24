from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from backend.utility import *

class UploadVideo(View):
    def get(self, request):
        return render(request, 'upload/upload.html')

    def post(self, request):
        creator = request.user.customuser
        source = request.POST.get('source')
        url = request.POST.get('url')
        vid_id = ""
        if source == "youtube":
            vid_id = getYTIdFromURL(url)
        # name, description, thumbnail, duration, tags
        metadata = getYTMetaData(vid_id)
        tags = metadata["tags"]

        tag_objs = []
        # make tag_objs
        for tag in tags:
            tag_objs.append(Tag.objects.get_or_create(name=tag)[0])

        video = Video(
            name=metadata["name"],
            source=source,
            vid_id=vid_id,
            description=metadata["description"],
            thumbnail=metadata["thumbnail"],
            duration=metadata["duration"],
            creator=creator
        )
        video.save()

        for tag_obj in tag_objs:
            video_tag = VideoTag(video=video, tag=tag_obj)
            video_tag.save()

        return JsonResponse({'v_uuid': video.uuid})





