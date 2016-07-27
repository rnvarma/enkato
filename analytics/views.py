from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from backend.models import *
from backend.utility import *


def getStudentSeriesData(series, cu):
    (ssData, _) = StudentSeriesData.objects.get_or_create(series=series, user=cu)
    return ssData


def getStudentSeriesVideoData(ssData, video):
    (ssvData, _) = StudentSeriesVideoData.objects.get_or_create(ss_data=ssData, video=video)
    return ssvData


class RecordSeriesVideoView(APIView):
    def post(self, request, s_id):
        series = Series.objects.get(uuid=s_id)

        v_id = request.POST.get('v_id')
        video = Video.objects.get(uuid=v_id)

        video_duration = video.duration
        view_duration = int(request.POST.get('duration')) / 1000  # in milliseconds
        end = int(float(request.POST.get('end')))

        if view_duration > (0.1 * video_duration) or view_duration > 30:
            video.num_views += 1

            video.save()

        if not request.user.is_anonymous():
            cu = request.user.customuser
            ssData = getStudentSeriesData(series, cu)
            ssvData = getStudentSeriesVideoData(ssData, video)

            ssvData.num_views += 1
            ssvData.total_time_watched += view_duration
            ssvData.seconds_into_video = end
            if ssvData.seconds_into_video > 0.9 * video_duration:
                ssvData.watched = True

            ssvData.save()

        return JsonResponse({
            'status': True,
            'numViews': video.num_views,
            'name': video.name
        })


def getCorrectAnswer(choices):
    # returns index of correct answer
    # returns -1 if no answer was said to be correct by instructor
    for i in range(len(choices)):
        if (choices[i].is_correct):
            return i
    return -1


class LogQuiz(APIView):
    def post(self, request, s_id, v_uuid):
        selectedAnswers = request.POST.getlist('selectedAnswers[]')

        s = Series.objects.get(uuid=s_id)
        ssd, _ = StudentSeriesData.objects.get_or_create(user=request.user.customuser, series=s)

        v = Video.objects.get(uuid=v_uuid)
        ssvd, _ = StudentSeriesVideoData.objects.get_or_create(ss_data=ssd.id,
                                                               video=v)

        quizQuestions = v.quiz_questions.all()

        ssvd.quizzes_data.all().delete()
        ssvd.completed = True
        ssvd.mastered = True  # changed if anything answer is wrong

        result = []
        numCorrect = 0
        for i in range(len(quizQuestions)):
            question = quizQuestions[i]
            correct = False
            choices = question.mc_responses.all()
            student_answer = int(selectedAnswers[i])
            correct_answer = getCorrectAnswer(choices)
            if correct_answer == student_answer:
                correct = True
                numCorrect += 1
            else:
                ssvd.mastered = False

            quizData = StudentSeriesVideoQuizQuestionData(
                ssv_data=ssvd,
                quiz_question=question,
                answer=student_answer,
                is_correct=correct
            )
            quizData.save()
            result.append({
                "studentAnswer": student_answer,
                "correctAnswer": correct_answer,
                "isCorrect": correct
            })

        ssvd.save()

        return JsonResponse({'result': result, 'numCorrect': numCorrect})
