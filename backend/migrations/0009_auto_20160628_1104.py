# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-28 11:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_series_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='num_clicks',
            field=models.IntegerField(default=0),
        ),
    ]
