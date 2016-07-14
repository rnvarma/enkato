from django.shortcuts import render, get_object_or_404
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from backend.models import *

from backend.views import Serializer

from rest_framework import viewsets, exceptions
from rest_framework.views import Response

import json


# Create your views here.
class SingleVideoPage(View):
    def get(self, request, v_uuid):
        return render(request, 'singlevideo/singlevideo.html', {'v_uuid': v_uuid})


class AddTopic(View):
    def post(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        time = request.POST.get('currentTime')
        newTopic = Topic(
            name="",
            video=video,
            time=int(time)
        )
        newTopic.save()
        return JsonResponse({
            'status': True,
            'newTopic': Serializer.serialize_topic(newTopic)
        })


class UpdateTopics(View):
    def post(self, request, v_uuid):
        topics_json = request.POST.get('topics')
        topics = json.loads(topics_json)
        for topic in topics:
            topic_obj = Topic.objects.get(uuid=topic["id"])
            topic_obj.time = topic["time"]
            topic_obj.name = topic["name"]
            topic_obj.save()
        return JsonResponse({'status': True})


class DeleteTopic(View):
    def post(self, request):
        t_uuid = request.POST.get('uuid')
        topic = Topic.objects.get(uuid=t_uuid)
        topic.delete()
        return JsonResponse({'status': True})


class EditVideoTesting(View):
    def get(self, request):
        return render(request, 'edit_video.html')


class UpdateQuiz(View):
    def post(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        questions_json = request.POST.get('questions')
        questions = json.loads(questions_json)
        count = 0
        for q in questions:
            qObj = QuizQuestion.objects.get(id=q["id"])
            qObj.question_text = q["quizQuestionText"]
            for choice in q["choiceList"]:
                cObj = MCChoice.objects.get(id=choice["id"])
                cObj.choice_text = choice["text"]
                cObj.is_correct = choice["is_correct"]
                cObj.save()
            qObj.save()
            count += 1

        return JsonResponse({'status': True})


class AddQuizQuestion(View):
    def post(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        q_count = video.question_counter
        new_question = QuizQuestion(
            video=video,
            order=q_count,
            question_type="mc"
        )
        new_question.save()
        video.question_counter += 1
        video.save()
        return JsonResponse({
            'status': True,
            'new_question': Serializer.serialize_quiz_question(new_question)
        })


class DeleteQuizQuestion(View):
    def post(self, request, v_uuid):
        q_id = request.POST.get('qid')
        question = QuizQuestion.objects.get(id=q_id)
        question.delete()

        return JsonResponse({
            'status': True,
            'qid': q_id
        })


class AddQuizOption(View):
    def post(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        q_id = request.POST.get('qid')
        question = QuizQuestion.objects.get(id=q_id)
        new_choice = MCChoice(
            quiz_question=question
        )
        new_choice.save()
        new_choice_data = Serializer.serialize_quiz_choice(new_choice)
        new_choice_data["focus"] = True

        return JsonResponse({
            'status': True,
            'new_choice': new_choice_data
        })


class DeleteQuizOption(View):
    def post(self, request, v_uuid):
        q_id = request.POST.get('qid')
        c_id = request.POST.get('cid')
        choice = MCChoice.objects.get(id=c_id)
        choice.delete()

        return JsonResponse({
            'status': True,
            'cid': c_id,
            'qid': q_id
        })


def can_make_changes(user, owner, video_uuid):
    if hasattr(user, 'customuser'):
        custom_user = user.customuser
        if (owner == custom_user or
            custom_user == Video.objects.get(uuid=video_uuid).creator):
            return True

    raise exceptions.PermissionDenied()

def get_update_data(data, partial_object, allowed_fields):
    if not len(data):
        raise exceptions.ValidationError('Add at least one of the following: ' + ', '.join(allowed_fields))
    for field in data:
        if field not in allowed_fields:
            raise exceptions.ValidationError(field + ' is not a supported field')

    updated_fields = []
    update_data = {}
    for key in allowed_fields:
        if hasattr(data, key):
            updated_fields.append(key)
            update_data[key] = data[key]
        else:
            update_data[key] = getattr(partial_object, key)

    return update_data, updated_fields

class QuestionViewset(viewsets.ViewSet):
    """ The quesetion API """

    def list(self, request, v_uuid):
        queryset = Question.objects.filter(video__uuid=v_uuid)
        serializer = QuestionSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, v_uuid):
        data = request.data.copy()
        data['user'] = request.user.customuser.id

        serializer = QuestionSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

    def retrieve(self, request, v_uuid, pk):
        question = get_object_or_404(Question, pk=pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def partial_update(self, request, v_uuid, pk):
        question = get_object_or_404(Question, pk=pk)
        if can_make_changes(user=request.user, owner=question.student, video_uuid=v_uuid):
            update_fields = ('topic', 'time', 'title', 'text', 'resolved')
            update_data, updated_fields = get_update_data(request.data, partial_object=question, allowed_fields=update_fields)
            serializer = QuestionSerializer(question, data=update_data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(update_modified='resolved' not in updated_fields)
            return Response(serializer.data)

    def destroy(self, request, v_uuid, pk):
        question = get_object_or_404(Question, pk=pk)
        if can_make_changes(user=request.user, owner=question.student, video_uuid=v_uuid):
            question.delete()
            return Response()


class QuestionResponseViewset(viewsets.ViewSet):
    """ The question response API """

    def list(self, request, v_uuid):
        queryset = QuestionResponse.objects.filter(question__video__uuid=v_uuid)
        serializer = QuestionResponseSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, v_uuid):
        data = request.data.copy()
        data['user'] = request.user.customuser.id
        if data['user'] == Video.objects.filter(uuid=v_uuid).all()[0].creator.id:
            data['is_instructor'] = True

        serializer = QuestionResponseSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def retrieve(self, request, v_uuid, pk):
        response = get_object_or_404(QuestionResponse, pk=pk)
        serializer = QuestionResponseSerializer(response)
        return Response(serializer.data)

    def partial_update(self, request, v_uuid, pk):
        response = get_object_or_404(QuestionResponse, pk=pk)
        if can_make_changes(user=request.user, owner=response.user, video_uuid=v_uuid):
            update_fields = ('text', 'endorsed')
            update_data, updated_fields = get_update_data(request.data, partial_object=response, allowed_fields=update_fields)
            serializer = QuestionResponseSerializer(response, data=update_data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(update_modified='endorsed' not in updated_fields)
            return Response(serializer.data)

    def destroy(self, request, v_uuid, pk):
        response = get_object_or_404(QuestionResponse, pk=pk)
        if can_make_changes(user=request.user, owner=response.user, video_uuid=v_uuid):
            response.delete()
            return Response()


# POST via /v/<v_uuid>/question/add
class AddQuestion(View):
    """ Given valid information, returns new question's data """

    def post(self, request, v_uuid):
        topic_id = int(request.POST.get('topic')) if request.POST.get('topic') else None
        question = Question(
            video=Video.objects.get(uuid=v_uuid),
            topic_id=topic_id,
            student=request.user.customuser,
            title=request.POST.get('title'),
            text=request.POST.get('text'),
            time=int(request.POST.get('time', 0))
        )
        question.save()
        # questionFileUpload = QuestionFileUpload(
        #    question=question,
        #    file=request.POST.get('file')
        # )
        # questionFileUpload.save()

        return JsonResponse(QuestionSerializer(question).data)
