# Generated by Django 2.2.6 on 2020-02-23 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0026_note_participant'),
    ]

    operations = [
        migrations.AddField(
            model_name='response',
            name='linked',
            field=models.BooleanField(default=False),
        ),
    ]
