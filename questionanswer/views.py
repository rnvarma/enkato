from django.utils import timezone
from django.shortcuts import get_object_or_404

from backend.models import *
from backend.serializers import QuestionSerializer, QuestionResponseSerializer, make_owner_permission

from rest_framework import viewsets, filters, permissions


class QuestionViewset(viewsets.ModelViewSet):
    """ The question API """

    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, make_owner_permission('student')) # also allow instructor
    filter_backends = (filters.OrderingFilter,)
    ordering = ('modified',)
    ordering_fields = ('responses',)

    def get_queryset(self):
        video = self.request.query_params.get('video_uuid')

        if video:
            queryset = Question.objects.filter(video__uuid=video)
        else:
            queryset = Question.objects.all()

        return queryset

    def perform_create(self, serializer):
        student = self.request.user.customuser.id
        video = get_object_or_404(Video, uuid=self.request.data.get('video_uuid'))

        serializer.save(student_id=student, video=video)

    def perform_update(self, serializer):
        if any(field in self.request.data for field in ('title', 'text', 'topic')):
            serializer.save(modified=timezone.now())
        else:
            serializer.save()


class QuestionResponseViewset(viewsets.ModelViewSet):
    """ The question response API """

    serializer_class = QuestionResponseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, make_owner_permission('user'),)

    def get_queryset(self):
        question = self.request.query_params.get('question_id')

        if question:
            return QuestionResponse.objects.filter(question=question)
        else:
            return QuestionResponse.objects.filter(user=self.request.user.customuser)

    def perform_create(self, serializer):
        user = self.request.user.customuser.id
        is_instructor = user == get_object_or_404(Question, pk=self.request.data.get('question_pk')).video.creator.id

        serializer.save(user_id=user, is_instructor=is_instructor)

    def perform_update(self, serializer):
        if 'text' in self.request.data:
            serializer.save(modified=timezone.now())
        else:
            serializer.save()
