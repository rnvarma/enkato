from django.shortcuts import render
from django.views.generic.base import View
from django.http import JsonResponse
from rest_framework.views import APIView

from backend.models import *
from backend.notification import *
from backend.serializers import SeriesSerializer
from backend.permissions import make_owner_permission

from rest_framework.views import APIView
from rest_framework import viewsets, permissions


class SeriesViewset(viewsets.ModelViewSet):
    """ The series API """

    lookup_field = 'uuid'
    serializer_class = SeriesSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          make_owner_permission(user_field='creator', user_edit_fields=None))

    def get_queryset(self):
        creator = self.request.query_params.get('creator')

        if creator:
            return Series.objects.filter(creator=creator)
        else:
            return Series.objects.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.customuser)

    def perform_destroy(self, instance):
        for series_video in instance.videos.all():
            series_video.video.delete()

        instance.delete()


class CreateSeries(APIView):
    def post(self, request):
        if request.user.is_anonymous():
            return JsonResponse({'status': False, 'issue': 'Forbidden to anonymous users'})
        name = request.POST.get('name')
        description = request.POST.get('description')
        cu = request.user.customuser

        series = Series(
            creator=cu,
            name=name,
            description=description
        )
        series.save()

        return JsonResponse({'status': True, 's_uuid': series.uuid})

class SeriesPage(View):
    def get(self, request, s_id):
        return render(request, 'series/series.html', {'s_id': s_id})

class SubscribeSeriesPage(APIView):
    def post(self, request, s_id):
        series = Series.objects.get(uuid=s_id)
        cu = request.user.customuser
        if series.creator == cu:
            return JsonResponse({'status': False, 'issue': 'Forbidden for creator to subscribe to own series'})
        if series.students.filter(id=cu.id).count() > 0:
            return JsonResponse({'status': False, 'issue': 'User already subscribed to the series'})
        series.students.add(cu)
        (ssData, _) = StudentSeriesData.objects.get_or_create(series=series, user=cu)
        for series_video in series.videos.all():
            StudentSeriesVideoData.objects.get_or_create(ss_data=ssData, video=series_video.video)
        request.user.groups.add(get_series_notification_group(series))
        return JsonResponse({'status': True})

class UnsubscribeSeriesPage(APIView):
    def post(self, request, s_id):
        series = Series.objects.get(uuid=s_id)
        cu = request.user.customuser
        if series.creator == cu:
            return JsonResponse({'status': False, 'issue': 'Forbidden for creator to subscribe or unsubscribe to own series'})
        if series.students.filter(id=cu.id).count() == 0:
            return JsonResponse({'status': False, 'issue': 'User not subscribed to the series'})
        series.students.remove(cu)
        request.user.groups.remove(get_series_notification_group(series))
        return JsonResponse({'status': True})


class SetSeriesPrivacy(APIView):
    def post(self, request):
        seriesUUID = request.POST.get('seriesUUID')
        is_private = request.POST.get('is_private')
        print("---------------------------------------------")
        print(type(is_private))
        print(is_private)

        if(is_private=="true"):
            is_private=True
        elif(is_private=="false"):
            is_private=False
        

        series = Series.objects.get(uuid=seriesUUID)
        series.is_private=is_private
        series.save()


        return JsonResponse({
            'status': True,
            'is_private': is_private,
            })















