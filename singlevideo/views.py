from django.shortcuts import render, get_object_or_404
from django.views.generic.base import View
from django.http import JsonResponse
from backend.models import *

from backend.views import Serializer

from backend.serializers import VideoSerializer
from rest_framework.views import APIView
from rest_framework import viewsets, permissions

from backend.serializers import SeriesSerializer
from backend.permissions import make_owner_permission

import json


class VideoViewset(viewsets.ModelViewSet):
    """ The video API """

    lookup_field = 'uuid'
    serializer_class = VideoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          make_owner_permission(user_field='creator', user_edit_fields=None))

    def get_queryset(self):
        return Video.objects.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.customuser)

    def perform_destroy(self, instance):
        instance.delete()


class SingleVideoPage(View):
    def get(self, request, v_uuid):
        time = request.GET.get('t')
        return render(request, 'singlevideo/singlevideo.html', {'v_uuid': v_uuid, 't': time})


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
        removed_topics_json = request.POST.get('removed_topics')
        removed_topics = json.loads(removed_topics_json)

        for removed_topic in removed_topics:
            topic_id = removed_topic.get('real_id', removed_topic['id'])
            topic_obj = get_object_or_404(Topic, pk=topic_id)
            topic_obj.delete()

        for topic in topics:
            if topic.get('committed', True):
                topic_id = topic.get('real_id', topic['id'])
                topic_obj = get_object_or_404(Topic, pk=topic_id)
                topic_obj.time = topic['time']
                topic_obj.name = topic['name']
                topic_obj.save()
            else:
                new_topic = Topic(
                    video=get_object_or_404(Video, uuid=v_uuid),
                    name=topic['name'],
                    time=int(topic['time']),
                )
                new_topic.save()

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


class ChangePrivacy(APIView):
    def post(self, request):
        videoUUID = request.POST.get('videoUUID')
        is_private = request.POST.get('is_private')

        if (is_private == 'true'):
            is_private = True
        elif (is_private == 'false'):
            is_private = False

        video = Video.objects.get(uuid=videoUUID)
        video.is_private = is_private

        video.save()

        return JsonResponse({
            'status': True,
        })