# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-12 19:01
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0022_auto_20160712_1502'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='timestamp',
        ),
        migrations.AddField(
            model_name='question',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2016, 7, 12, 19, 1, 9, 509312, tzinfo=utc), editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2016, 7, 12, 19, 1, 15, 457627, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='modified_count',
            field=models.IntegerField(default=0),
        ),
    ]
