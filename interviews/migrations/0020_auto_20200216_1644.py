# Generated by Django 2.2.6 on 2020-02-16 16:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0019_participant_length'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participant',
            old_name='length',
            new_name='duration',
        ),
    ]
