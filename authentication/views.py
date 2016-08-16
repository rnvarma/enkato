from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from backend.models import *



class Register(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(Register, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password1')
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')

        user = User.objects.filter(username__iexact=username)
        if user.exists():
            return JsonResponse({
                'status': False,
                'text': 'Username already exists.',
                'field': 'username',
            })
        
        user = User.objects.filter(email__iexact=email)
        if user.exists():
            return JsonResponse({
                'status': False,
                'text': 'Email already registered',
                'field': 'email',
            })

        new_user = User.objects.create_user(
            username,
            email,
            password
        )
        new_user.first_name = firstname
        new_user.last_name = lastname
        new_user.save()


        cu = CustomUser(
            email=request.POST.get('email'),
            first_name=request.POST.get('firstname'),
            last_name=request.POST.get('lastname'),
            username=request.POST.get('username'),
            user=new_user
        )
        cu.save()

        return JsonResponse({'status': True})


