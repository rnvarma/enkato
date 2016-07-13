from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from backend.models import *

class CreateSeries(View):
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

class SubscribeSeriesPage(View):
    def post(self, request, s_id):
        series = Series.objects.get(uuid=s_id)
        cu = request.user.customuser
        if series.creator == cu:
            return JsonResponse({'status': False, 'issue': 'Forbidden for creator to subscribe to own series'})
        if series.students.filter(id=cu.id).count() > 0:
            return JsonResponse({'status': False, 'issue': 'User already subscribed to the series'})
        series.students.add(cu)
        return JsonResponse({'status': True})

class UnsubscribeSeriesPage(View):
    def post(self, request, s_id):
        series = Series.objects.get(uuid=s_id)
        cu = request.user.customuser
        if series.creator == cu:
            return JsonResponse({'status': False, 'issue': 'Forbidden for creator to subscribe or unsubscribe to own series'})
        if series.students.filter(id=cu.id).count() == 0:
            return JsonResponse({'status': False, 'issue': 'User not subscribed to the series'})
        series.students.remove(cu)
        return JsonResponse({'status': True})

class SeriesViewerPage(View):
    def get(self, request, s_id):
        return render(request, 'series/series_viewer.html', {'s_id': s_id})





