from django.db.models.query import Prefetch

from backend.models import *
from backend.serializers import StudentAnalyticsSerializer, DashboardSeriesSerializer
from backend.permissions import make_owner_permission

from rest_framework import views, filters, permissions
from rest_framework.response import Response


class StudentAnalyticsView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = self.request.user.customuser
        student_series_data = Prefetch('students_data', StudentSeriesData.objects.filter(user=user))
        return Response({
            'subscribed_series': StudentAnalyticsSerializer(user.student_series.prefetch_related(student_series_data), many=True).data,
            'created_series': DashboardSeriesSerializer(user.created_series.all(), many=True).data,
            'all_unsubscribed_series': DashboardSeriesSerializer(Series.objects.filter(is_private=False).exclude(students=user).exclude(creator=user), many=True).data,
        })

