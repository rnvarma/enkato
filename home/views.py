from django.shortcuts import render
from django.views.generic.base import View
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from backend.models import *

class JobsPage(View):
    def get(self, request):
        return render(request, 'jobs.html')

class HomePage(View):
    def get(self, request):
        return render(request, 'index.html')

class InterestedUserRegistration(APIView):
    def post(self, request):
        name = request.POST.get('name')
        email = request.POST.get('email')
        check = InterestedUser.objects.filter(email=email).count()
        if not check:
            new_interested_user = InterestedUser(name=name, email=email)
            new_interested_user.save()
        return JsonResponse({"status": True})