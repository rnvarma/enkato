# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-11 22:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0020_auto_20160708_2107'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionresponse',
            name='text',
            field=models.TextField(),
        ),
    ]
