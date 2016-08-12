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
    def serialize_series_light(series, request=None):
        data = {}
        data["uuid"] = series.uuid
        data["name"] = series.name
        data["description"] = series.description
        data["image"] = series.image
        data["creator"] = Serializer.serialize_user(series.creator)
        data["num_videos"] = len(series.videos.all())
        data["thumbnails"] = getSeriesThumbnails(series)
        series_videos = series.videos.all().order_by("order")
        total_time = 0
        for series_video in series_videos:
            total_time += series_video.video.duration
        data["total_len"] = sanetizeTime(total_time)
        data["is_creator"] = False if not request else (series.creator == request.user.customuser or request.user.is_superuser)
        data["is_subscribed"] = False if not request else bool(request.user.customuser.student_series.filter(id=series.id).count())
        return data    

    @staticmethod
    def serialize_series(series, request=None):
        data = {}
        is_creator = False
        data["is_anonymous"], data["is_creator"], data["is_subscribed"] = False, False, False
        data["is_anonymous"] = False if not request else request.user.is_anonymous()
        if not data["is_anonymous"]:
            is_creator = False if not request else (series.creator == request.user.customuser or request.user.is_superuser)
            data["is_creator"] = is_creator
            data["is_subscribed"] = False if not request else bool(request.user.customuser.student_series.filter(id=series.id).count())

        data["uuid"] = series.uuid
        data["name"] = series.name
        data["description"] = series.description
        data["is_private"] = series.is_private
        data["image"] = series.image
        data["creator"] = Serializer.serialize_user(series.creator)
        data["num_videos"] = len(series.videos.all())
        data["thumbnails"] = getSeriesThumbnails(series)
        series_videos = series.videos.all().order_by("order")
        if(not is_creator):
            series_videos = series_videos.filter(video__is_private = False)
        total_time = 0
        s_videos = []
        for series_video in series_videos:
            series_video.video.order = series_video.order
            total_time += series_video.video.duration
        data["total_len"] = sanetizeTime(total_time)
        videos = map(lambda sv: sv.video, series_videos)
        data["videos"] = map(Serializer.serialize_video, videos)
        
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
        data["videoTitles"] = map(getTitlesFromVideoData, videos)
        return data

    @staticmethod
    def serialize_video(video):

        data = {}
        data["uuid"] = video.uuid
        data["timestamp"] = video.timestamp
        data["source"] = video.source
        data["is_private"] = video.is_private
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
        data["committed"] = True;
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
    """
    User API
    List users: 1/users
    Current user: 1/users/current
    """

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
    def get(self, request, u_id=None):
        if not u_id:
            cu = request.user.customuser
        else:
            cu = CustomUser.objects.get(id=u_id)
        data = {}
        data["userdata"] = Serializer.serialize_userprofiledata(cu)
        data["created_series"] = map(Serializer.serialize_series, cu.created_series.all())
        data["subscribed_series"] = map(Serializer.serialize_series, cu.student_series.all())
        return Response(data)

class UserDashboardData(APIView):
    def get(self, request):
        cu = request.user.customuser
        data = {}
        seriesList = cu.student_series.all().filter(is_private=False)  
        data["subscribed_series"] = map(Serializer.serialize_series_light, seriesList)
        subscribed_ids = map(lambda s: s["uuid"], data["subscribed_series"])
        data["created_series"] = map(Serializer.serialize_series_light, cu.created_series.all())
        map(lambda s: subscribed_ids.append(s["uuid"]), data["created_series"])
        data["all_unsubscribed_series"] = map(Serializer.serialize_series_light, Series.objects.exclude(uuid__in=subscribed_ids).filter(is_private=False))
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
        series_data['hide_series'] = False
        series_data['status'] = True
        if((request.user.is_anonymous() or series.creator != request.user.customuser) and series_data['is_private']):
            series_data = {
                'hide_series':True,
                'status': True,
            }
        return Response(series_data)

class CuratesSeries(APIView):
    def get(self, request):
        data = {}
        series = Series.objects.filter(curated=True)
        data["curated_series"] = map(Serializer.serialize_series_light, series)
        return Response(data)

class SeriesVideoData(APIView):
    def get(self, request, v_id):
        try:
            video = Video.objects.filter(vid_id = v_id).first()
            if(video != None):
                videoData = Serializer.serialize_video(video)
                series = Series.objects.filter(creator= video.creator)
                response = {}
                response['inSeries'] = True
                seriesData = {}
                for serie in series:
                    seriesData[serie.uuid] = Serializer.serialize_series_videos(serie)
                seriesVideoData = findSeriesVideoData(seriesData, v_id)
                response["seriesVideoData"]=seriesVideoData
                return Response(response)
            else:
                return Response({
                    'inSeries': False
                })
        except Series.DoesNotExist:
            return Response({
                'inSeries': False
            })


class VideoData(APIView):
    def get(self, request, v_uuid):
        video = Video.objects.get(uuid=v_uuid)
        topicList = video.topics.all().order_by('time')
        frontendTList = map(Serializer.serialize_topic, topicList)
        #get QuizList
        quizQs = video.quiz_questions.all()
        questions = map(Serializer.serialize_quiz_question, quizQs)
        return Response({
            'videoID': video.vid_id,
            'topicList': frontendTList,
            'videoData': Serializer.serialize_video(video),
            'questions': questions,
            'numQuestions':quizQs.count()
        })

class VideoIdData(APIView):
    def get(self, request, v_id):
        try:
            video = Video.objects.get(vid_id=v_id)
            topicList = video.topics.all().order_by('time')
            frontendTList = map(Serializer.serialize_topic, topicList)
            return Response({
                'inDatabase': True,
                'topicList':frontendTList,
                'videoData': Serializer.serialize_video(video)
            })
        except Video.MultipleObjectsReturned:
            video = Video.objects.filter(vid_id=v_id).first()
            topicList = video.topics.all().order_by('time')
            frontendTList = map(Serializer.serialize_topic, topicList)
            return Response({
                'inDatabase': True,
                'topicList':frontendTList,
                'videoData': Serializer.serialize_video(video)
            })
        except Video.DoesNotExist:
            return Response({
                'inDatabase': False
            })

class YTValidateVideo(APIView):
    def get(self, request, yt_id):
        video_search = Video.objects.filter(vid_id=yt_id)
        if (video_search.count() == 0):
            return Response({'status': False})
        video = video_search.first()
        videoUUID = video.uuid
        seriesvideo_search = SeriesVideo.objects.filter(video=video)
        seriesUUID = None
        if (seriesvideo_search.count() > 0):
            series = seriesvideo_search.first().series
            seriesUUID = series.uuid
        return Response({
            'status': True,
            'videoUUID': videoUUID,
            'seriesUUID': seriesUUID
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

def getCorrectAnswer(choices):
    #returns index of correct answer
    #returns -1 if no answer was said to be correct by instructor
    for i in range(len(choices)):
        if(choices[i].is_correct):
            return i
    return -1

class LoadQuizData(APIView):
    def get(self, request, s_id, v_id):
        data = {}
        s = Series.objects.get(uuid=s_id)
        ssd, _ = StudentSeriesData.objects.get_or_create(user=request.user.customuser, series=s)

        v = Video.objects.get(uuid=v_id)
        ssvd, _ = StudentSeriesVideoData.objects.get_or_create(ss_data=ssd, video=v)

        quizQuestions = v.quiz_questions.all()
        data["questions"] = map(Serializer.serialize_quiz_question, quizQuestions)
        data["numQuestions"] = quizQuestions.count()

        seriesQuizQuestionData = ssvd.quizzes_data.all()

        result = []
        numCorrect = 0
        if(len(quizQuestions) != len(seriesQuizQuestionData)):
            completedQuizInfo = {
                'result':result, 
                'numCorrect':numCorrect
            }
            data['completedQuizInfo'] = completedQuizInfo
            data['quizTaken'] = False
        else: 
            for i in range(len(quizQuestions)):
                if seriesQuizQuestionData[i].is_correct: numCorrect += 1
                result.append({
                    "studentAnswer": int(seriesQuizQuestionData[i].answer),
                    "correctAnswer": getCorrectAnswer(quizQuestions[i].mc_responses.all()),
                    "isCorrect": seriesQuizQuestionData[i].is_correct
                })

            completedQuizInfo= {
                'result':result, 
                'numCorrect':numCorrect
            }
            data['completedQuizInfo'] = completedQuizInfo
            data['quizTaken'] = True
        return Response(data)


class DatedModelMixin(object):
    """ Add fields to modified_update_fields if you would like them to update modified on PATCH """

    def perform_update(self, serializer):
        if any(field in self.request.data for field in self.modified_update_fields):
            serializer.save(modified=timezone.now())
        else:
            serializer.save()

class ParseImportTopics(APIView):
    def post(self, request):
        s = request.POST.get('s')
        data = {
            'new_topics': parseTopicUploadString(s)
        }
        return Response(data)



