from django.shortcuts import render
from django.views.generic import View


class InstructorResponse(View):
    def get(self, request):
        return render(request, 'instructortools/response.html', {'user_id': self.request.user.customuser.id})
