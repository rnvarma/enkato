from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from backend.models import *

class Login(View):
    def get(self, request):
        return render(request, 'authentication/login.html')

    def post(self, request):
        user = authenticate(username=request.POST.get('user_name'),
                            password=request.POST.get('password'))
        if user is not None:
            login(request, user)
            return JsonResponse({'status': True})
        else:
            return JsonResponse({'status': False})


class Register(View):
    def get(self, request):
        return render(request, 'authentication/register.html')

    def post(self, request):
        new_user = User.objects.create_user(
            request.POST.get('user_name'),
            request.POST.get('email'),
            request.POST.get('password')
        )
        new_user.first_name = request.POST.get('first_name')
        new_user.last_name = request.POST.get('last_name')
        new_user.save()

        cu = CustomUser(
            email= request.POST.get('email'),
            first_name= request.POST.get('first_name'),
            last_name= request.POST.get('last_name'),
            username= request.POST.get('user_name'),
            user=new_user
        )
        cu.save()

        return JsonResponse({'status': True})

class Logout(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect("/login")


