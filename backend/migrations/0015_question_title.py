# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-07 21:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_auto_20160707_2041'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='title',
            field=models.TextField(default=''),
        ),
    ]
