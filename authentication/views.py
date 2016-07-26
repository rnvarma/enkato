from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from backend.models import *

class Register(APIView):
    def post(self, request):
        user = User.objects.filter(username=request.POST.get('username'))
        if user.exists():
            return JsonResponse({'status': False, 'issue': 'Username already exists'})
        
        new_user = User.objects.create_user(
            request.POST.get('username'),
            request.POST.get('email'),
            request.POST.get('password')
        )
        new_user.first_name = request.POST.get('firstname')
        new_user.last_name = request.POST.get('lastname')
        new_user.save()


        cu = CustomUser(
            email= request.POST.get('email'),
            first_name= request.POST.get('firstname'),
            last_name= request.POST.get('lastname'),
            username= request.POST.get('username'),
            user=new_user
        )
        cu.save()

        return JsonResponse({'status': True})


