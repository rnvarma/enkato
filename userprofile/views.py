from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

class UserProfile(View):
    def get(self, request, u_id):
        if not u_id: u_id = request.user.customuser.id
        return render(request, 'userprofile/profile.html', {'u_id': u_id})