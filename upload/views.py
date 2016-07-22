from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from backend.utility import getPlaylistVideos, getYTPlaylistIdFromURL, getYTIdFromURL, getYTMetaData, getStringsFromStringList
from backend.models import Tag, Video, VideoTag, Series, SeriesVideo

def loadYTVideoToDB(metadata, creator):
    tags = metadata["tags"]

    tag_objs = []
    # find or create a tag so we can link it to this video
    for tag_name in tags:
        tag, _ = Tag.objects.get_or_create(name=tag_name)
        tag_objs.append(tag)

    # TODO: see if YouTube video blocks embedding

    video = Video.objects.create(
        name=metadata["name"],
        source="youtube",
        vid_id=metadata["id"],
        description=metadata["description"],
        thumbnail=metadata["thumbnail"],
        duration=metadata["duration"],
        creator=creator
    )
    video.save()

    # TODO: flag if duplicate video, add option to soft link or even
    # hard link to the original video

    # store or update tags, linking to this video
    for tag_obj in tag_objs:
        video_tag = VideoTag(video=video, tag=tag_obj)
        video_tag.save()

    return video

def uploadYTPlaylist(url, creator):
    p_id = getYTPlaylistIdFromURL(url)
    videos = getPlaylistVideos(p_id)
    videos.sort(lambda x, y: cmp(x["order"], y["order"]))
    videos = [loadYTVideoToDB(v, creator) for v in videos]
    return videos

def uploadYTVideo(url, creator):
    """
    Saves video and each individual tag from the url or
    returns None if bad url or failed API response
    """

    vid_id = getYTIdFromURL(url)
    if vid_id is None: return None

    # metadata contains name, description, thumbnail, duration, tags
    metadata = getYTMetaData(vid_id)
    if metadata is None: return None

    return loadYTVideoToDB(metadata, creator)

class UploadVideo(View):
    def get(self, request):
        return render(request, 'upload/upload.html')

    def post(self, request):
        creator = request.user.customuser
        source = request.POST.get('source')
        url = request.POST.get('url')
        if source == "youtube":
            video = uploadYTVideo(url, creator)
        return JsonResponse({'v_uuid': video.uuid})

# TODO: support uploading playlists, possibly by writing a function that takes
# in a playlist, contacts the API and gets a list of videos and the just does our
# normal thing with a list of videos

class UploadVideoToSeries(View):
    """ Takes video url list 'urls' and adds it to the series """

    def post(self, request, s_id):
        creator = request.user.customuser
        urls = request.POST.get('urls')
        url_list = getStringsFromStringList(urls)

        # build list of newly added videos
        videos = []
        bad_urls = []
        for url in url_list:
            # means that it is a playlist url
            if "v=" not in url and "list" in url:
                data = uploadYTPlaylist(url, creator)
                videos.extend(data)
            else:
                video = uploadYTVideo(url, creator)
                if video is None:
                    bad_urls.append(url)
                else:
                    videos.append(video)

        series = Series.objects.get(uuid=s_id)
        # find current video order
        curr_order_num = 0
        if series.videos.all().count() > 0:
            curr_order_num = series.videos.all().order_by("-order")[0].order + 1

        # add each video to series
        for (i, video) in enumerate(videos):
            series_video = SeriesVideo(
                series=series,
                video=video,
                order=i + curr_order_num
            )
            series_video.save()

        if not bad_urls:
            return JsonResponse({ 'status': True })
        else:
            return JsonResponse({ 'status': False, 'errors': bad_urls })




