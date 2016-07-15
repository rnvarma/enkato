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
    notify.send(instance.series.creator, description=instance.series.creator.username + 'added a series video', recipient=get_series_notification_group(instance.series), verb='new series video', action_object=instance)

post_save.connect(new_series_video_handler, sender=SeriesVideo)

def new_series_handler(sender, instance, created, **kwargs):
    group = get_series_notification_group(instance)

post_save.connect(new_series_handler, sender=Series)