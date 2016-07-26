from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.utils import timezone
from shortuuidfield import ShortUUIDField
from django.contrib.auth.models import User, Group

from django.db.models.signals import post_save
from notifications.signals import notify
from notifications.models import Notification
from backend.models import *

def get_series_notification_group(series):
	group, created = Group.objects.get_or_create(name='series' + series.uuid)
	return group

def new_series_video_handler(sender, instance, created, **kwargs):
	if created and not instance.series.is_private:
		notify.send(instance.series.creator, recipient=get_series_notification_group(instance.series), verb='new series video', action_object=instance)

post_save.connect(new_series_video_handler, sender=SeriesVideo)

def new_series_handler(sender, instance, created, **kwargs):
	if created:
		group = get_series_notification_group(instance)

post_save.connect(new_series_handler, sender=Series)

def new_question_handler(sender, instance, created, **kwargs):
	''' I think you guys wanted to allow creators to disable notifications on certain videos,
		that isn't done here just as a heads up
	'''
	if created:
		notify.send(instance.student, recipient = instance.video.creator.user, verb = 'new question', action_object=instance)

post_save.connect(new_question_handler, sender=Question)

def new_question_response_handler(sender, instance, created, **kwargs):
	if instance.question.resolved == False and created:
		notify.send(instance.user, recipient = instance.question.student.user, verb = 'new question response', action_object=instance)

post_save.connect(new_question_response_handler, sender=QuestionResponse)