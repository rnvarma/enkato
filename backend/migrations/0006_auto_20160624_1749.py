# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-24 17:49
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20160624_1746'),
    ]

    operations = [
        migrations.RenameField(
            model_name='video',
            old_name='vid_link',
            new_name='vid_id',
        ),
    ]
