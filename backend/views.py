from django.views.generic.base import View
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from backend.models import *
from backend.utility import *
from backend.serializers import CustomUserSerializer

from rest_framework import viewsets, permissions


class Serializer(object):
    @staticmethod
    def serialize_user(user):
        data = {}
        data["username"] = user.username
        data["user_id"] = user.id
        data["name"] = capitalize(user.first_name) + " " + capitalize(user.last_name)
        return data

    @staticmethod
    def serialize_userprofiledata(user):
        data = {}
        data["username"] = user.username
        data["user_id"] = user.id
        data["name"] = capitalize(user.first_name) + " " + capitalize(user.last_name)
        data["bio"] = user.bio
        data["image"] = user.image
        return data

    @staticmethod
    def serialize_class(cls):
        data = {}
        data["name"] = cls.name
        data["description"] = cls.description
        data["is_private"] = cls.is_private
        data["creators"] = map(Serializer.serialize_user, cls.creators.all())
        return data

    @staticmethod
    def serialize_series(series, request=None):
        data = {}
        
        data["name"] = series.name
        data["description"] = series.description
        data["image"] = series.image
        data["creator"] = Serializer.serialize_user(series.creator)
        data["num_videos"] = len(series.videos.all())
        data["thumbnails"] = getSeriesThumbnails(series)
        series_videos = series.videos.all().order_by("order")
        total_time = 0
        for series_video in series_videos:
            series_video.video.order = series_video.order
            total_time += series_video.video.duration
        data["total_len"] = sanetizeTime(total_time)
        videos = map(lambda sv: sv.video, series_videos)
        data["videos"] = map(Serializer.serialize_video, videos)
        data["is_creator"] = False if not request else series.creator == request.user.customuser
        data["is_subscribed"] = False if not request else bool(request.user.customuser.student_series.filter(id=series.id).count())
        return data    

    @staticmethod
    def serialize_series_videos(series):
        data = {}
        series_videos = series.videos.all().order_by("order")
        for series_video in series_videos:
            series_video.video.order = series_video.order
        videos = map(lambda sv: sv.video, series_videos)
        data["videoIDs"] = map(getYTIdFromVideoData, videos)
        data["videoUUIDs"] = map(getUUIDFromVideoData, videos)
        data["thumbnails"] = map(getThumbnailFromVideoData,videos)
        return data

    @staticmethod
    def serialize_video(video):
        data = {}
        data["uuid"] = video.uuid
        data["timestamp"] = video.timestamp
        data["source"] = video.source
        data["vid_id"] = video.vid_id
        data["name"] = video.name
        data["description"] = video.description
        data["thumbnail"] = video.thumbnail
        data["duration_raw"] = video.duration
        data["duration_clean"] = convert_seconds_to_duration(video.duration)
        data["duration_san"] = sanetizeTime(video.duration)
        data["creator"] = Serializer.serialize_user(video.creator)
        data["num_views"] = video.num_views
        data["order"] = video.order if 'order' in video.__dict__ else 0
        data["num_topics"] = video.topics.count()
        data["num_quiz_questions"] = video.quiz_questions.count()
        return data
        
    @staticmethod
    def serialize_topic(topic):
        data = {}
        data["name"] = topic.name
        data["time"] = topic.time
        data["time_clean"] = convert_seconds_to_duration(topic.time)
        data["id"] = topic.uuid
        data['real_id'] = topic.id
        data["isCurrentTopic"] = False  # used in frontend
        return data

    @staticmethod
    def serialize_quiz_question(quizQ):
        data = {}
        data["shouldRefocus"] = False
        data["currentFocus"] = 0
        data["active"] = False
        data["quizQuestionText"] = quizQ.question_text
        data["new"] = False
        data["choiceList"] = map(Serializer.serialize_quiz_choice, quizQ.mc_responses.all())
        data["id"] = quizQ.id
        return data

    @staticmethod
    def serialize_quiz_choice(choice):
        data = {}
        data["text"] = choice.choice_text
        data["id"] = choice.id
        data["is_correct"] = choice.is_correct
        return data


class UserViewset(viewsets.ReadOnlyModelViewSet):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user.customuser

class UserData(APIView):
    def get(self, request):
        if request.user.is_anonymous():
            data = {
                'logged_in': False
            }
        else:
            cu = request.user.customuser
            data = Serializer.serialize_user(cu)
            data["logged_in"] = True
        return Response(data)

class UserProfileData(APIView):
    def get(self, request, u_id):
        cu = CustomUser.objects.get(id=u_id)
        data = {}
        data["userdata"] = Serializer.serialize_userprofiledata(cu)
        data["created_series"] = map(Serializer.serialize_series, cu.created_series.all())
        data["subscribed_series"] = map(Serializer.serialize_series, cu.student_series.all())
        return Response(data)

class ClassroomData(APIView):
    def get(self, request, c_id):
        classroom = Classroom.objects.get(uuid=c_id)
        class_data = Serializer.serialize_class(classroom)
        return Response(class_data)

class SeriesData(APIView):
    def get(self, request, s_id):
        series = Series.objects.get(uuid=s_id)
        series_data = Serializer.serialize_series(series, request)
        return Response(series_data)

class SeriesVideoData(View):
    def get(self, request, v_id):
        try:
            video = Video.objects.filter(vid_id = v_id).first()
            videoData = Serializer.serialize_video(video)
            series = Series.objects.filter(creator= video.creator)
            response = {}
            response['inSeries'] = True
            seriesData = {}
            for serie in series:
                seriesData[serie.uuid] = Serializer.serialize_series_videos(serie)
            seriesData = findSeriesIdAndThumbnails(seriesData, v_id)
            response["seriesData"]=seriesData
            return JsonResponse(response)
        except Series.DoesNotExist:
            return JsonResponse({
                'inSeries': False
            })


class VideoData(View):
    def get(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        topicList = video.topics.all().order_by('time')
        frontendTList = map(Serializer.serialize_topic, topicList)
        #get QuizList
        quizQs = video.quiz_questions.all()
        questions = map(Serializer.serialize_quiz_question, quizQs)
        return JsonResponse({
            'videoID': video.vid_id,
            'topicList': frontendTList,
            'videoData': Serializer.serialize_video(video),
            'questions': questions,
            'numQuestions':quizQs.count()
        })

class VideoIdData(View):
    def get(self, request, v_id):
        try:
            video = Video.objects.get(vid_id=v_id)
            topicList = video.topics.all().order_by('time')
            frontendTList = map(Serializer.serialize_topic, topicList)
            return JsonResponse({
                'inDatabase': True,
                'topicList':frontendTList,
                'videoData': Serializer.serialize_video(video)
            })
        except Video.MultipleObjectsReturned:
            video = Video.objects.filter(vid_id=v_id).first()
            topicList = video.topics.all().order_by('time')
            frontendTList = map(Serializer.serialize_topic, topicList)
            return JsonResponse({
                'inDatabase': True,
                'topicList':frontendTList,
                'videoData': Serializer.serialize_video(video)
            })
        except Video.DoesNotExist:
            return JsonResponse({
                'inDatabase': False
            })

class QuizData(APIView):
    def get(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        quizQs = video.quiz_questions.all()
        questions = map(Serializer.serialize_quiz_question, quizQs)
        return JsonResponse({
            'questions': questions,
            'numQuestions': quizQs.count()
        })


def secondify(time):
    timeL = time.split(":")
    seconds = 0
    print(timeL)
    if(len(timeL) == 2):
        seconds = int(timeL[0])*60 + int(timeL[1])
    elif(len(timeL)==3):
        seconds = int(timeL[0])*3600 + int(timeL[1])*60 + int(timeL[2])
    return seconds

class YTIndexScript(APIView):
    def get(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        topics = '''02:25 : Primitives
06:32 : Output
08:51 : Math
11:18 : Conditionals
14:38 : Looping
17:14 : Strings
22:05 : Input
26:08 : Arrays
27:32 : Vectors
28:58 : Tuples
30:02 : Functions
32:14 : Closures
33:48 : Pointers
37:41 : Structs
41:12 : Traits
43:37 : Enums
'''
        topicObjsList = []
        for topic in topics.splitlines():
            topicL = topic.split(" : ")
            topicName = topicL[1]
            topicTime = secondify(topicL[0])
            topicObj = Topic(video = video, time = topicTime, name = topicName)
            topicObjsList.append(topicObj)
            print(topicName)
        for topicObj in topicObjsList:
            topicObj.save()
        return JsonResponse({'hey':True})

def getCorrectAnswer(choices):
    #returns index of correct answer
    #returns -1 if no answer was said to be correct by instructor
    for i in range(len(choices)):
        if(choices[i].is_correct):
            return i
    return -1


class LoadQuizData(APIView):
    def get(self, request, s_id, v_id):
        print("hi----------------------------")
        s = Series.objects.get(uuid=s_id)
        ssd = StudentSeriesData.objects.get(user=request.user.customuser, series=s)

        v = Video.objects.get(uuid=v_id)
        ssvd = StudentSeriesVideoData.objects.get(ss_data=ssd, video=v)

        quizQuestions = v.quiz_questions.all()
        seriesQuizQuestionData = ssvd.quizzes_data.all()

        result = []
        numCorrect=0
        print("yoooooooooooo")
        print(len(quizQuestions))
        print(len(seriesQuizQuestionData))
        if(len(quizQuestions)!=len(seriesQuizQuestionData)):
            print("quiz not taken!!!!")
            completedQuizInfo={
                'result':result, 
                'numCorrect':numCorrect
            }
            return JsonResponse({
                'completedQuizInfo':completedQuizInfo,
                'quizTaken':False})
        else: 
            print("quiz taken!!!!")
        
        for i in range(len(quizQuestions)):
            question = quizQuestions[i]
            takenQuizData = seriesQuizQuestionData[i]
            correct=False
            choices=question.mc_responses.all()

            studentAnswer = int(takenQuizData.answer)
            correctAnswer = getCorrectAnswer(choices)

            if(correctAnswer==studentAnswer):
                correct=True
                numCorrect+=1

            result.append({
                "studentAnswer":studentAnswer,
                "correctAnswer":correctAnswer,
                "isCorrect":correct
            })

        completedQuizInfo={
            'result':result, 
            'numCorrect':numCorrect
        }
        return JsonResponse({
            'completedQuizInfo':completedQuizInfo,
            'quizTaken':True
        })


class DatedModelMixin(object):
    """ Add fields to modified_update_fields if you would like them to update modified on PATCH """

    def perform_update(self, serializer):
        if any(field in self.request.data for field in self.modified_update_fields):
            serializer.save(modified=timezone.now())
        else:
            serializer.save()
