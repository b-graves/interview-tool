# Generated by Django 2.2.6 on 2020-02-04 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0011_component_priority'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='view',
            field=models.IntegerField(default=0),
        ),
    ]
