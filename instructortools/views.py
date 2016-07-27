from django.shortcuts import render
from django.views.generic import View

from backend.models import *
from backend.serializers import InstructorSeriesSerializer, InstructorGeneralSeriesSerializer
from backend.permissions import make_owner_permission

from rest_framework import viewsets, filters, permissions
from rest_framework.response import Response


class InstructorAnalyticsView(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticated,)  # TODO: needs owner authentication

    def detailed(self, request):
        user = request.user.customuser
        queryset = Series.objects.filter(creator=user)
        return Response(InstructorSeriesSerializer(queryset, many=True).data)

    def general(self, request):
        user = request.user.customuser
        queryset = Series.objects.filter(creator=user)
        return Response(InstructorGeneralSeriesSerializer(queryset, many=True).data)

