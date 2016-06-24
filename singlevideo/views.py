from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

# Create your views here.
class SingleVideoPage(View):
    def get(self, request,v_id):
        print(v_id)
        return render(request, 'singlevideo/singlevideo.html', {'v_id':v_id})