from django.shortcuts import render
from django.views.generic.base import View
from django.http import JsonResponse

from backend.utility import getPlaylistVideos, getYTPlaylistIdFromURL, getYTIdFromURL, getYTMetaData, \
    getStringsFromStringList
from backend.models import Tag, Video, VideoTag, Series, SeriesVideo


def loadYTVideoToDB(metadata, creator, series):
    """
    Creates a video and saves it's tags, unless it's a duplicate, in which case None is returned
    """

    # TODO: see if YouTube video blocks embedding

    videos = Video.objects.filter(source='youtube', vid_id=metadata['id'])

    # if this yt video is alread in the series, then dont add it again
    if SeriesVideo.objects.filter(video__in=videos, series=series).count():
        return None

    video = Video(
        source='youtube',
        vid_id=metadata['id'],
        duration=metadata['duration'],
        name=metadata['name'],
        description=metadata['description'],
        thumbnail=metadata['thumbnail'],
        creator=creator
    )
    video.save()

    tags = metadata['tags']

    tag_objs = []
    # find or create a tag so we can link it to this video
    for tag_name in tags:
        tag, _ = Tag.objects.get_or_create(name=tag_name)
        tag_objs.append(tag)

    video.save()

    # store or update tags, linking to this video
    for tag_obj in tag_objs:
        video_tag = VideoTag(video=video, tag=tag_obj)
        video_tag.save()

    return video


def uploadYTPlaylist(url, creator, series):
    p_id = getYTPlaylistIdFromURL(url)
    videos = getPlaylistVideos(p_id)
    videos.sort(lambda x, y: cmp(x["order"], y["order"]))
    videos = [loadYTVideoToDB(v, creator, series) for v in videos]
    return videos


def uploadYTVideo(url, creator, series):
    """
    Saves video and each individual tag from the url or
    returns None if bad url or failed API response
    """

    vid_id = getYTIdFromURL(url)
    if vid_id is None:
        return None

    # metadata contains name, description, thumbnail, duration, tags
    metadata = getYTMetaData(vid_id)
    if metadata is None:
        return None

    return loadYTVideoToDB(metadata, creator, series)


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


class UploadVideoToSeries(View):
    """ Takes video url list 'urls' and adds it to the series """

    def post(self, request, s_id):
        creator = request.user.customuser
        urls = request.POST.get('urls')
        url_list = getStringsFromStringList(urls)
        series = Series.objects.get(uuid=s_id)

        # build list of newly added videos
        videos = []
        bad_urls = []
        for url in url_list:
            # means that it is a playlist url
            if "v=" not in url and "list" in url:
                data = uploadYTPlaylist(url, creator, series)
                videos.extend(data)  # None's from duplicate still get through here
            else:
                video = uploadYTVideo(url, creator, series)
                if video is None:  # bad urls, *happens with duplicates as well*
                    bad_urls.append(url)
                else:
                    videos.append(video)

        # find current video order
        curr_order_num = 0
        if series.videos.all().count() > 0:
            curr_order_num = series.videos.all().order_by("-order")[0].order + 1

        # add each video to series
        print(videos)
        for (i, video) in enumerate(videos):
            if video:  # not duplicate
                series_video = SeriesVideo(
                    series=series,
                    video=video,
                    order=i + curr_order_num
                )
                series_video.save()

        if not bad_urls:
            return JsonResponse({'status': True})
        else:
            return JsonResponse({'status': False, 'errors': bad_urls})
