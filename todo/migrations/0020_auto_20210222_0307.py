# Generated by Django 3.0.8 on 2021-02-22 03:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0019_habit_habitentry'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='habitentry',
            unique_together={('habit', 'date')},
        ),
    ]
