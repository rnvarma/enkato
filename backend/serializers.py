from rest_framework import serializers

from backend.utility import getSeriesThumbnails, sanetizeTime
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser


class QuestionResponseSerializer(serializers.ModelSerializer):
    question_pk = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), source='question')

    class Meta:
        model = QuestionResponse
        exclude = ('question',)
        read_only_fields = ('modified', 'modified_count', 'is_instructor')
        depth = 1


class QuestionSerializer(serializers.ModelSerializer):
    responses = QuestionResponseSerializer(many=True, read_only=True)
    video_pk = serializers.PrimaryKeyRelatedField(read_only=True, source='video')
    topic_pk = serializers.PrimaryKeyRelatedField(allow_null=True, queryset=Topic.objects.all(), source='topic')

    class Meta:
        model = Question
        read_only_fields = ('modified', 'modified_count')
        depth = 1


class VideoSerializer(serializers.ModelSerializer):
    question_set = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = '__all__'
        depth = 1


class SeriesVideoSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)

    class Meta:
        model = SeriesVideo
        exclude = ('series',)


class SeriesSerializer(serializers.ModelSerializer):
    videos = SeriesVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Series
        fields = '__all__'


class StudentSeriesVideoDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentSeriesVideoData
        exclude = ('id', 'ss_data',)
        depth = 1


class StudentSeriesDataSerializer(serializers.ModelSerializer):
    videos_data = StudentSeriesVideoDataSerializer(many=True)
    analysis = serializers.SerializerMethodField()

    class Meta:
        model = StudentSeriesData
        fields = ('videos_data', 'analysis')

    def get_analysis(self, obj):
        data = {
            'watched': 0,
            'completed': 0,
            'continue_video': None,  # video where person should 'continue learning'
        }

        # prefetch not working: video_data = obj.videos_data
        video_data = [v for v in obj.videos_data.all() if v.ss_data == obj]

        for index, video_in_series in enumerate(video_data):
            if video_in_series.watched:
                data['watched'] += 1
            elif not data['continue_video']:
                data['continue_video'] = index
            if video_in_series.watched and video_in_series.completed:
                data['completed'] += 1

        if not data['continue_video']:  # set to first video if not set
            data['continue_video'] = 0

        return data


class DashboardSeriesSerializer(serializers.ModelSerializer):
    thumbnails = serializers.SerializerMethodField()

    class Meta:
        model = Series

    def get_thumbnails(self, obj):
        return getSeriesThumbnails(obj)


class StudentAnalyticsSerializer(serializers.ModelSerializer):
    user_data = StudentSeriesDataSerializer(many=True, source='students_data')
    video_count = serializers.IntegerField(source='videos.count', read_only=True)
    thumbnails = serializers.SerializerMethodField()
    total_time = serializers.SerializerMethodField()

    class Meta:
        model = Series

    def get_thumbnails(self, obj):
        return getSeriesThumbnails(obj)

    def get_total_time(self, obj):
        total_time = 0
        for series_video in obj.videos.all():
            total_time += series_video.video.duration  # inefficient

        return sanetizeTime(total_time)


class InstructorQuizQuestionDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentSeriesVideoQuizQuestionData
        fields = ('quiz_question', 'answer', 'is_correct')


class InstructorQuizDataSerializer(serializers.ModelSerializer):
    quizzes_data = InstructorQuizQuestionDataSerializer(many=True)

    class Meta:
        model = StudentSeriesVideoData
        exclude = ('id', 'ss_data')


class InstructorSeriesDataSerializer(serializers.ModelSerializer):
    videos_data = InstructorQuizDataSerializer(many=True)
    user = CustomUserSerializer()

    class Meta:
        model = StudentSeriesData
        fields = ('videos_data', 'user')


class InstructorSeriesSerializer(serializers.ModelSerializer):
    students_data = InstructorSeriesDataSerializer(many=True)

    class Meta:
        model = Series
        fields = ('name', 'uuid', 'students_data')


class InstructorGeneralSeriesSerializer(serializers.ModelSerializer):
    analytics = serializers.SerializerMethodField()

    class Meta:
        model = Series
        fields = ('name', 'uuid', 'analytics')

    def get_analytics(self, series):
        students_data = series.students_data.all()

        all_video_data = {}
        for student_data in students_data:
            for video_data in student_data.videos_data.all():  # TODO: PREFETCH
                if video_data.video.id not in all_video_data:
                    all_video_data[video_data.video.id] = {'num_views': 0, 'viewers': 0}
                all_video_data[video_data.video.id]['num_views'] += video_data.num_views
                all_video_data[video_data.video.id]['viewers'] += 1

        return all_video_data
