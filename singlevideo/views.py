from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from backend.models import *

from backend.views import Serializer

import json

# Create your views here.
class SingleVideoPage(View):
    def get(self, request,v_uuid):
        return render(request, 'singlevideo/singlevideo.html', {'v_uuid':v_uuid})

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
                cObj.save()
            qObj.save()
            count+=1
        
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




