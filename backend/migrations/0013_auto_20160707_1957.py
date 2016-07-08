# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-07 19:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_auto_20160630_2117'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='QuestionResposneUpvote',
            new_name='QuestionResponseUpvote',
        ),
        migrations.AddField(
            model_name='question',
            name='video',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='backend.Video'),
            preserve_default=False,
        ),
    ]
