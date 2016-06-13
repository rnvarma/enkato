from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

class Login(View):
    def get(self, request):
        return render(request, 'authentication/login.html')


class Register(View):
    def get(self, request):
        return render(request, 'authentication/register.html')