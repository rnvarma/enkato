# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-24 17:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20160624_1745'),
    ]

    operations = [
        migrations.AddField(
            model_name='seriesvideo',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='seriesvideo',
            name='series',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='backend.Series'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='seriesvideo',
            name='video',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='series_video', to='backend.Video'),
        ),
    ]
