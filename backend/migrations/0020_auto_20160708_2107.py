# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-08 21:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_questionfileupload'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='title',
            field=models.TextField(max_length=200),
        ),
    ]
