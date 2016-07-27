from django.shortcuts import render
from django.views.generic import View

from backend.models import *
from backend.serializers import InstructorSeriesSerializer
from backend.permissions import make_owner_permission

from rest_framework import views, filters, permissions
from rest_framework.response import Response


class InstructorAnalyticsView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)  # TODO: needs owner authentication

    def get(self, request):
        user = self.request.user.customuser
        queryset = Series.objects.filter(creator=user)
        return Response(InstructorSeriesSerializer(queryset, many=True).data)

