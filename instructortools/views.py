from django.shortcuts import get_object_or_404

from backend.models import *
from backend.serializers import InstructorSeriesSerializer, InstructorGeneralSeriesSerializer, BreakpointSerializer
from backend.permissions import make_owner_permission

from rest_framework import viewsets, mixins, permissions
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


class BreakpointViewset(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    serializer_class = BreakpointSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        video = get_object_or_404(Video, uuid=self.request.data.get('video_uuid'))  # using id instead, could save query

        serializer.save(video=video)