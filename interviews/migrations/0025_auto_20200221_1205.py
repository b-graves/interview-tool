# Generated by Django 2.2.6 on 2020-02-21 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0024_note_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='text',
            field=models.TextField(blank=True, default=''),
        ),
    ]