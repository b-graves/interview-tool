# Generated by Django 2.2.6 on 2020-02-24 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0029_remove_response_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='biasReflection',
            field=models.BooleanField(default=False),
        ),
    ]
