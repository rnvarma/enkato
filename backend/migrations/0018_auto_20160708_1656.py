# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-08 16:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0017_question_resolved'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='title',
            field=models.TextField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='question',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='backend.Video'),
        ),
    ]
