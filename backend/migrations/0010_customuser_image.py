# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-29 20:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20160628_1104'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='image',
            field=models.CharField(default='', max_length=300),
        ),
    ]
