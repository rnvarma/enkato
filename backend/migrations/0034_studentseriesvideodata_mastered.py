# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-27 17:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0033_series_curated'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentseriesvideodata',
            name='mastered',
            field=models.BooleanField(default=False),
        ),
    ]
