from django.shortcuts import get_object_or_404

from backend.models import *
from backend.serializers import SerializationHelpers as Helpers, QuestionSerializer, QuestionResponseSerializer

from rest_framework import viewsets
from rest_framework.views import Response


class QuestionViewset(viewsets.ViewSet):
    """ The question API """

    def list(self, request, v_uuid):
        queryset = Question.objects.filter(video__uuid=v_uuid)
        serializer = QuestionSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, v_uuid):
        Helpers.is_logged_in(request.user)
        serializer = QuestionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(student=request.user.customuser, video=get_object_or_404(Video, uuid=v_uuid))

        return Response(serializer.data)

    def retrieve(self, request, v_uuid, pk):
        question = get_object_or_404(Question, pk=pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def partial_update(self, request, v_uuid, pk):
        question = get_object_or_404(Question, pk=pk)
        if Helpers.can_make_changes(user=request.user, owner=question.student, video_uuid=v_uuid):
            update_fields = ('topic', 'time', 'title', 'text', 'resolved')
            update_data, updated_fields = get_update_data(request.data, partial_object=question, allowed_fields=update_fields)
            serializer = QuestionSerializer(question, data=update_data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(update_modified='resolved' not in updated_fields)
            return Response(serializer.data)

    def destroy(self, request, v_uuid, pk):
        question = get_object_or_404(Question, pk=pk)
        if Helpers.can_make_changes(user=request.user, owner=question.student, video_uuid=v_uuid):
            question.delete()
            return Response()


class QuestionResponseViewset(viewsets.ViewSet):
    """ The question response API """

    def list(self, request, v_uuid):
        queryset = QuestionResponse.objects.filter(question__video__uuid=v_uuid)
        serializer = QuestionResponseSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, v_uuid):
        Helpers.is_logged_in(request.user)
        user = request.user.customuser
        is_instructor = user == Video.objects.filter(uuid=v_uuid).all()[0].creator

        serializer = QuestionResponseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # don't know why I have to pass question_id here, messed up
        serializer.save(question_id=request.data['question_id'], user_id=user.id, is_instructor=is_instructor)

        return Response(serializer.data)

    def retrieve(self, request, v_uuid, pk):
        response = get_object_or_404(QuestionResponse, pk=pk)
        serializer = QuestionResponseSerializer(response)
        return Response(serializer.data)

    def partial_update(self, request, v_uuid, pk):
        response = get_object_or_404(QuestionResponse, pk=pk)
        if Helpers.can_make_changes(user=request.user, owner=response.user, video_uuid=v_uuid):
            update_fields = ('text', 'endorsed')
            update_data, updated_fields = get_update_data(request.data, partial_object=response, allowed_fields=update_fields)
            serializer = QuestionResponseSerializer(response, data=update_data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(update_modified='endorsed' not in updated_fields)
            return Response(serializer.data)

    def destroy(self, request, v_uuid, pk):
        response = get_object_or_404(QuestionResponse, pk=pk)
        if Helpers.can_make_changes(user=request.user, owner=response.user, video_uuid=v_uuid):
            response.delete()
            return Response()


class QuestionResponseViewset(viewsets.ModelViewSet):
    """ The question response API """

    serializer_class = QuestionResponseSerializer

    def get_queryset(self):
        question = self.request.query_params.get('question_id')

        if question:
            return QuestionResponse.objects.filter(question=question)
        else:
            return QuestionResponse.objects.filter(user=self.request.user.customuser)

    def perform_create(self, serializer):
        user = self.request.user.customuser.id
        is_instructor = user == Question.objects.filter(self.request.data['question']).video.creator.id

        serializer.save(user=user, is_instructor=is_instructor)