from rest_framework import serializers, exceptions

from .models import *


# Serializer helpers
class SerializationHelpers:

    @staticmethod
    def is_logged_in(user):
        return hasattr(user, 'customuser')

    @staticmethod
    def can_make_changes(user, owner, video_uuid):
        if SerializationHelpers.is_logged_in(user):
            custom_user = user.customuser
            if (owner == custom_user or
                custom_user == Video.objects.get(uuid=video_uuid).creator):
                return True

        raise exceptions.PermissionDenied()

    @staticmethod
    def get_update_data(data, partial_object, allowed_fields):
        if not len(data):
            raise exceptions.ValidationError('Add at least one of the following: ' + ', '.join(allowed_fields))
        for field in data:
            if field not in allowed_fields:
                raise exceptions.ValidationError(field + ' is not a supported field')

        updated_fields = []
        update_data = {}
        for key in allowed_fields:
            if key in data:
                updated_fields.append(key)
                update_data[key] = data[key]
            else:
                update_data[key] = getattr(partial_object, key)

        return update_data, updated_fields


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
