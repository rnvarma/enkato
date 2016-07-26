from rest_framework import serializers

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
        }

        # prefetch not working: video_data = obj.videos_data
        video_data = [v for v in obj.videos_data.all() if v.ss_data == obj]

        for video_in_series in video_data:
            if video_in_series.watched:
                data['watched'] += 1
            if video_in_series.completed:
                data['completed'] += 1

        return data

class StudentAnalyticsSerializer(serializers.ModelSerializer):
    user_data = StudentSeriesDataSerializer(many=True, source='students_data')

    class Meta:
        model = Series
