# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-18 21:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0028_auto_20160714_1806'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Video'),
        ),
    ]
