from django.db.models.query import Prefetch

from backend.models import *
from backend.serializers import StudentAnalyticsSerializer
from backend.permissions import make_owner_permission

from rest_framework import viewsets, filters, permissions


class StudentAnalyticsViewset(viewsets.ModelViewSet):
    serializer_class = StudentAnalyticsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.customuser
        student_series_data = Prefetch('students_data', StudentSeriesData.objects.filter(user=user))
        return user.student_series.prefetch_related(student_series_data)
