# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-13 21:42
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20160607_1919'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classroom',
            old_name='creator',
            new_name='creators',
        ),
    ]
