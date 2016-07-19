# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-07 19:19
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import shortuuidfield.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassFeedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('stars', models.IntegerField(default=1)),
                ('comment', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuidfield.fields.ShortUUIDField(blank=True, editable=False, max_length=22)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(default='', max_length=100)),
                ('description', models.TextField(blank=True, default='', null=True)),
                ('is_private', models.BooleanField(default=False)),
                ('access_code', models.CharField(default='', max_length=100)),
                ('avg_rating', models.IntegerField(default=0)),
                ('avg_length_videos', models.IntegerField(default=0)),
                ('avg_topics_videos', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(default='', max_length=100)),
                ('first_name', models.CharField(default='', max_length=100)),
                ('last_name', models.CharField(default='', max_length=100)),
                ('username', models.CharField(default='', max_length=100)),
                ('birthday', models.DateTimeField(blank=True, null=True)),
                ('bio', models.TextField(default='')),
                ('education_status', models.CharField(default='', max_length=200)),
                ('school_name', models.CharField(default='', max_length=200)),
                ('employment_status', models.CharField(default='', max_length=200)),
                ('employer_name', models.CharField(default='', max_length=200)),
                ('user', models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='customuser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FRAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='MCChoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_text', models.CharField(default='', max_length=200)),
                ('is_correct', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuidfield.fields.ShortUUIDField(blank=True, editable=False, max_length=22)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(default='', max_length=500)),
                ('description', models.TextField(blank=True, default='', null=True)),
                ('avg_length_videos', models.IntegerField(default=0)),
                ('avg_topics_videos', models.IntegerField(default=0)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_playlists', to='backend.CustomUser')),
                ('subscribers', models.ManyToManyField(related_name='subscribed_playlists', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='PlaylistVideo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('num_views', models.IntegerField(default=0)),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='backend.Playlist')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('text', models.TextField(default='')),
                ('time', models.IntegerField(default=0)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('text', models.TextField(default='')),
                ('is_instructor', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='backend.Question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_responses', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionResposneUpvote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('question_response', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='upvotes', to='backend.QuestionResponse')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_response_upvotes', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionUpvote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='upvotes', to='backend.Question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_upvotes', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('question_text', models.TextField(default='')),
                ('question_type', models.CharField(default='', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='StudentClassData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students_data', to='backend.Classroom')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='classes_data', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='StudentClassVideoData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num_views', models.IntegerField(default=0)),
                ('avg_duration_watched', models.IntegerField(default=0)),
                ('seconds_into_video', models.IntegerField(default=0)),
                ('completed', models.BooleanField(default=False)),
                ('sc_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos_data', to='backend.StudentClassData')),
            ],
        ),
        migrations.CreateModel(
            name='StudentClassVideoQuizQuestionData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.TextField(default='')),
                ('is_correct', models.BooleanField(default=False)),
                ('context', models.CharField(default='', max_length=20)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('quiz_question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='backend.QuizQuestion')),
                ('scv_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes_data', to='backend.StudentClassVideoData')),
            ],
        ),
        migrations.CreateModel(
            name='StudentPlaylistData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students_data', to='backend.Playlist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playlists_data', to='backend.CustomUser')),
            ],
        ),
        migrations.CreateModel(
            name='StudentPlaylistVideoData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num_views', models.IntegerField(default=0)),
                ('avg_duration_watched', models.IntegerField(default=0)),
                ('seconds_into_video', models.IntegerField(default=0)),
                ('completed', models.BooleanField(default=False)),
                ('sp_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos_data', to='backend.StudentPlaylistData')),
            ],
        ),
        migrations.CreateModel(
            name='StudentUnitData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('sc_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='units_data', to='backend.StudentClassData')),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuidfield.fields.ShortUUIDField(blank=True, editable=False, max_length=22)),
                ('time', models.IntegerField(default=0)),
                ('name', models.CharField(default='', max_length=200)),
                ('description', models.TextField(default='')),
                ('num_clicks', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuidfield.fields.ShortUUIDField(blank=True, editable=False, max_length=22)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(default='', max_length=100)),
                ('order', models.IntegerField(default=0)),
                ('description', models.TextField(default='')),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='units', to='backend.Classroom')),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuidfield.fields.ShortUUIDField(blank=True, editable=False, max_length=22)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('order', models.IntegerField(default=0)),
                ('source', models.CharField(default='', max_length=200)),
                ('vid_link', models.CharField(blank=True, max_length=200, null=True)),
                ('name', models.CharField(default='', max_length=200)),
                ('description', models.TextField(default='')),
                ('thumbnail', models.CharField(default='', max_length=200)),
                ('duration', models.IntegerField(default=0)),
                ('num_views', models.IntegerField(default=0)),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='backend.Classroom')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='backend.Unit')),
            ],
        ),
        migrations.CreateModel(
            name='VideoFeedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('stars', models.IntegerField(default=1)),
                ('comment', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_feedback', to='backend.CustomUser')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feedback', to='backend.Video')),
            ],
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.AddField(
            model_name='topic',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='backend.Video'),
        ),
        migrations.AddField(
            model_name='studentunitdata',
            name='unit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students_data', to='backend.Unit'),
        ),
        migrations.AddField(
            model_name='studentplaylistvideodata',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playlist_students_data', to='backend.Video'),
        ),
        migrations.AddField(
            model_name='studentclassvideodata',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_students_data', to='backend.Video'),
        ),
        migrations.AddField(
            model_name='quizquestion',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_questions', to='backend.Video'),
        ),
        migrations.AddField(
            model_name='question',
            name='topic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='backend.Topic'),
        ),
        migrations.AddField(
            model_name='playlistvideo',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playlists', to='backend.Video'),
        ),
        migrations.AddField(
            model_name='mcchoice',
            name='quiz_question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mc_responses', to='backend.QuizQuestion'),
        ),
        migrations.AddField(
            model_name='franswer',
            name='quiz_question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fr_response', to='backend.QuizQuestion'),
        ),
        migrations.AddField(
            model_name='classroom',
            name='creator',
            field=models.ManyToManyField(related_name='created_classrooms', to='backend.CustomUser'),
        ),
        migrations.AddField(
            model_name='classroom',
            name='students',
            field=models.ManyToManyField(related_name='student_classrooms', to='backend.CustomUser'),
        ),
        migrations.AddField(
            model_name='classroom',
            name='tas',
            field=models.ManyToManyField(related_name='ta_classrooms', to='backend.CustomUser'),
        ),
        migrations.AddField(
            model_name='classfeedback',
            name='classroom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_feedbacks', to='backend.Classroom'),
        ),
        migrations.AddField(
            model_name='classfeedback',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_feedbacks', to='backend.CustomUser'),
        ),
    ]
