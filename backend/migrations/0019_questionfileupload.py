# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-08 20:16
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_auto_20160708_1656'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionFileUpload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to=b'')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='backend.Question')),
            ],
        ),
    ]
