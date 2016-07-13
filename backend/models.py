from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.utils import timezone
from shortuuidfield import ShortUUIDField
from django.contrib.auth.models import User

from rest_framework import serializers


class DatedModel(models.Model):
    """ Generic model with created, modified, and modified count fields """

    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    modified_count = models.IntegerField(default=0)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.id: # Model does not exist yet
            self.created = timezone.now()
        else:
            self.modified_count += 1
        self.modified = timezone.now()

        return super(DatedModel, self).save(*args, **kwargs)



class CustomUser(models.Model):
    email = models.CharField(max_length=100, default="")
    first_name = models.CharField(max_length=100, default="")
    last_name = models.CharField(max_length=100, default="")
    username = models.CharField(max_length=100, default="")
    birthday = models.DateTimeField(blank=True, null=True)
    bio = models.TextField(default="")
    # level of education: High School, College, Post-College, etc.
    education_status = models.CharField(max_length=200, default="")
    school_name = models.CharField(max_length=200, default="")
    # full-time, part-time, looking for a job, etc.
    employment_status = models.CharField(max_length=200, default="")
    employer_name = models.CharField(max_length=200, default="")
    user = models.OneToOneField(settings.AUTH_USER_MODEL, default=0, related_name="customuser")
    image = models.CharField(max_length=300, default="")

    def __str__(self):
        return self.first_name + " " + self.last_name


# =================================================================================== #
#                               CLASSROOM MODELS                                      #
# =================================================================================== #

class Classroom(models.Model):
    uuid = ShortUUIDField(editable=False)
    timestamp = models.DateTimeField(default=timezone.now)  # when created
    creator = models.ForeignKey(CustomUser, related_name="created_classrooms")
    tas = models.ManyToManyField(CustomUser, related_name="ta_classrooms")
    students = models.ManyToManyField(CustomUser, related_name="student_classrooms")
    name = models.CharField(max_length=100, default="")
    description = models.TextField(default="", blank=True, null=True)
    is_private = models.BooleanField(default=False)
    access_code = models.CharField(max_length=100, default="")
    avg_rating = models.IntegerField(default=0)  # x.y * 10 = xy
    avg_length_videos = models.IntegerField(default=0)  # number of seconds
    avg_topics_videos = models.IntegerField(default=0)

    def __str__(self):
        return self.name


# class rating systems
# - basic star-rating feedback
# - number of students enrolled
# - time before responding to questions
# - topics indexed per video
# - amount of videos, average length of video
class ClassFeedback(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)  # when made
    user = models.ForeignKey(CustomUser, related_name="class_feedbacks")
    classroom = models.ForeignKey(Classroom, related_name="class_feedbacks")
    stars = models.IntegerField(default=1)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.first_name + ": " + self.classroom.name


class Unit(models.Model):
    uuid = ShortUUIDField(editable=False)
    timestamp = models.DateTimeField(default=timezone.now)  # when created
    name = models.CharField(max_length=100, default="")
    classroom = models.ForeignKey(Classroom, related_name="units")
    order = models.IntegerField(default=0)
    description = models.TextField(default="")

    def __str__(self):
        return self.name


# =================================================================================== #
#                                   Playlist MODELS                                   #
# =================================================================================== #

class Series(models.Model):
    uuid = ShortUUIDField(editable=False)
    timestamp = models.DateTimeField(default=timezone.now)  # when created
    creator = models.ForeignKey(CustomUser, related_name="created_series")
    tas = models.ManyToManyField(CustomUser, related_name="ta_series")
    students = models.ManyToManyField(CustomUser, related_name="student_series")
    name = models.CharField(max_length=100, default="")
    description = models.TextField(default="", blank=True, null=True)
    is_private = models.BooleanField(default=False)
    access_code = models.CharField(max_length=100, default="")
    avg_rating = models.IntegerField(default=0)  # x.y * 10 = xy
    avg_length_videos = models.IntegerField(default=0)  # number of seconds
    avg_topics_videos = models.IntegerField(default=0)
    image = models.CharField(max_length=300, default="")

    def __str__(self):
        return self.name


# class rating systems
# - basic star-rating feedback
# - number of students enrolled
# - time before responding to questions
# - topics indexed per video
# - amount of videos, average length of video
class SeriesFeedback(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)  # when made
    user = models.ForeignKey(CustomUser, related_name="series_feedbacks")
    series = models.ForeignKey(Series, related_name="series_feedbacks")
    stars = models.IntegerField(default=1)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.first_name + ": " + self.classroom.name


# =================================================================================== #
#                                   Playlist MODELS                                   #
# =================================================================================== #

class Playlist(models.Model):
    uuid = ShortUUIDField(editable=False)
    timestamp = models.DateTimeField(default=timezone.now)  # when created
    name = models.CharField(max_length=500, default="")
    creator = models.ForeignKey(CustomUser, related_name="created_playlists")
    description = models.TextField(default="", blank=True, null=True)
    subscribers = models.ManyToManyField(CustomUser, related_name="subscribed_playlists")
    avg_length_videos = models.IntegerField(default=0)  # number of seconds
    avg_topics_videos = models.IntegerField(default=0)

    def __str__(self):
        return self.name


# =================================================================================== #
#                                   Video MODELS                                      #
# =================================================================================== #

class Tag(models.Model):
    name = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.name


class Video(models.Model):
    uuid = ShortUUIDField(editable=False)
    timestamp = models.DateTimeField(default=timezone.now)  # when created
    source = models.CharField(max_length=200, default="")  # youtube, vimeo, custom, etc
    vid_id = models.CharField(max_length=200, blank=True, null=True)  # if not custom
    name = models.CharField(max_length=200, default="")
    description = models.TextField(default="")
    thumbnail = models.CharField(max_length=200, default="")
    # seconds
    duration = models.IntegerField(default=0)
    num_views = models.IntegerField(default=0)
    creator = models.ForeignKey(CustomUser, related_name="video_uploads")
    question_counter = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class VideoTag(models.Model):
    video = models.ForeignKey(Video, related_name="tags")
    tag = models.ForeignKey(Tag, related_name="videos")


class ClassroomVideo(models.Model):
    video = models.OneToOneField(Video, related_name="classroom_video")
    classroom = models.ForeignKey(Classroom, related_name="videos")
    unit = models.ForeignKey(Unit, related_name="videos")
    order = models.IntegerField(default=0)  # order within the unit


class SeriesVideo(models.Model):
    video = models.OneToOneField(Video, related_name="series_video")
    series = models.ForeignKey(Series, related_name="videos")
    order = models.IntegerField(default=0)  # order within the series


class PlaylistVideo(models.Model):
    video = models.ForeignKey(Video, related_name="playlists")
    playlist = models.ForeignKey(Playlist, related_name="videos")
    order = models.IntegerField(default=0)  # order within playlist
    num_views = models.IntegerField(default=0)


class VideoFeedback(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)  # when made
    video = models.ForeignKey(Video, related_name="feedback")
    user = models.ForeignKey(CustomUser, related_name="video_feedback")
    stars = models.IntegerField(default=1)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.first_name + ": " + self.video.name


# =================================================================================== #
#                               TOPIC+QA MODELS                                       #
# =================================================================================== #

class Topic(models.Model):
    uuid = ShortUUIDField(editable=False)
    video = models.ForeignKey(Video, related_name="topics")
    time = models.IntegerField(default=0)  # seconds count into video
    name = models.CharField(max_length=200, default="")
    description = models.TextField(default="")
    num_clicks = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Question(DatedModel):
    student = models.ForeignKey(CustomUser, related_name="questions")
    video = models.ForeignKey(Video, related_name="videos")
    topic = models.ForeignKey(Topic, related_name="questions", blank=True, null=True)
    time = models.IntegerField(default=0)
    title = models.TextField(max_length=200)
    text = models.TextField()
    resolved = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.text


class QuestionFileUpload(models.Model):
    question = models.ForeignKey(Question, related_name="files")
    file = models.FileField()


class QuestionUpvote(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)  # when done
    question = models.ForeignKey(Question, related_name="upvotes")
    user = models.ForeignKey(CustomUser, related_name="question_upvotes")


class QuestionResponse(DatedModel):
    question = models.ForeignKey(Question, related_name="responses")
    user = models.ForeignKey(CustomUser, related_name="question_responses")
    is_instructor = models.BooleanField(default=False)
    text = models.TextField()
    endorsed = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.text


class QuestionResponseUpvote(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)  # when done
    question_response = models.ForeignKey(QuestionResponse, related_name="upvotes")
    user = models.ForeignKey(CustomUser, related_name="question_response_upvotes")


class QuestionResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionResponse
        read_only_fields = ('modified',)


class QuestionSerializer(serializers.ModelSerializer):
    responses = QuestionResponseSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        read_only_fields = ('modified',)
        depth = 1

# =================================================================================== #
#                               Quiz     MODELS                                       #
# =================================================================================== #

class QuizQuestion(models.Model):
    video = models.ForeignKey(Video, related_name="quiz_questions")
    order = models.IntegerField(default=0)
    question_text = models.TextField(default="")
    question_type = models.CharField(max_length=10, default="")  # mc/tf or fr


# possible answers
class MCChoice(models.Model):
    quiz_question = models.ForeignKey(QuizQuestion, related_name="mc_responses")
    choice_text = models.CharField(max_length=200, default="")
    is_correct = models.BooleanField(default=False)  # is this the correct answer to the question

    def __str__(self):
        return self.choice_text


# correct answer
class FRAnswer(models.Model):
    quiz_question = models.ForeignKey(QuizQuestion, related_name="fr_response")
    text = models.TextField(default="")

    def __str__(self):
        return self.response


# =================================================================================== #
#                               Student Analytics                                     #
# =================================================================================== #


class StudentClassData(models.Model):
    user = models.ForeignKey(CustomUser, related_name="classes_data")
    classroom = models.ForeignKey(Classroom, related_name="students_data")


class StudentUnitData(models.Model):
    sc_data = models.ForeignKey(StudentClassData, related_name="units_data")
    unit = models.ForeignKey(Unit, related_name="students_data")
    completed = models.BooleanField(default=False)


class StudentClassVideoData(models.Model):
    sc_data = models.ForeignKey(StudentClassData, related_name="videos_data")
    video = models.ForeignKey(Video, related_name="class_students_data")
    num_views = models.IntegerField(default=0)
    avg_duration_watched = models.IntegerField(default=0)  # number seconds
    seconds_into_video = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)


class StudentClassVideoQuizQuestionData(models.Model):
    scv_data = models.ForeignKey(StudentClassVideoData, related_name="quizzes_data")
    quiz_question = models.ForeignKey(QuizQuestion, related_name="responses")
    answer = models.TextField(default="")
    is_correct = models.BooleanField(default=False)
    context = models.CharField(max_length=20, default="")  # either diagnostic, post-video, unit, class, etc
    timestamp = models.DateTimeField(default=timezone.now)


class StudentPlaylistData(models.Model):
    user = models.ForeignKey(CustomUser, related_name="playlists_data")
    playlist = models.ForeignKey(Playlist, related_name="students_data")


class StudentPlaylistVideoData(models.Model):
    sp_data = models.ForeignKey(StudentPlaylistData, related_name="videos_data")
    video = models.ForeignKey(Video, related_name="playlist_students_data")
    num_views = models.IntegerField(default=0)
    avg_duration_watched = models.IntegerField(default=0)  # number seconds
    seconds_into_video = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)
