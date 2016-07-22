from django.shortcuts import get_object_or_404

from backend.models import *
from backend.serializers import QuestionSerializer, QuestionResponseSerializer
from backend.views import DatedModelMixin
from backend.permissions import make_owner_permission

from rest_framework import viewsets, filters, permissions


class QuestionViewset(DatedModelMixin, viewsets.ModelViewSet):
    """ The question API """

    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          make_owner_permission(user_field='student', user_edit_fields=('title', 'text', 'topic_pk', 'resolved'),
                                                instructor_field='video.creator', instructor_edit_fields=('resolved',)))
    filter_backends = (filters.OrderingFilter,)
    ordering = ('modified',)
    ordering_fields = ('responses',)
    modified_update_fields = ('title', 'text', 'topic_pk')

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


class QuestionResponseViewset(DatedModelMixin, viewsets.ModelViewSet):
    """ The question response API """

    serializer_class = QuestionResponseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          make_owner_permission(user_field='user', user_edit_fields=('text',),
                                                instructor_field='question.video.creator', instructor_edit_fields=('endorsed',)),)
    modified_update_fields = ('text',)

    def get_queryset(self):
        question = self.request.query_params.get('question_id')

        if question:
            return QuestionResponse.objects.filter(question=question)
        else:
            return QuestionResponse.objects.all()

    def perform_create(self, serializer):
        user = self.request.user.customuser.id
        is_instructor = user == get_object_or_404(Question, pk=self.request.data.get('question_pk')).video.creator.id

        serializer.save(user_id=user, is_instructor=is_instructor)
