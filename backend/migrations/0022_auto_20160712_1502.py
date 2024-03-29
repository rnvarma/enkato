# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-12 15:02
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0021_auto_20160711_2206'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='questionresponse',
            name='timestamp',
        ),
        migrations.AddField(
            model_name='questionresponse',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2016, 7, 12, 15, 2, 6, 620030, tzinfo=utc), editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questionresponse',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2016, 7, 12, 15, 2, 14, 123808, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questionresponse',
            name='modified_count',
            field=models.IntegerField(default=0),
        ),
    ]
