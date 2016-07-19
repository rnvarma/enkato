from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from backend.models import *

class QuizAddingFormWrapper(View):
    def get(self, request):
        return render(request, 'testinggrounds/quizaddingform.html')

