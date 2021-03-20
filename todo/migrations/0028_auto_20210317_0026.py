# Generated by Django 3.0.8 on 2021-03-17 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0027_auto_20210311_1136'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='habit',
            name='unique_title',
        ),
        migrations.AddConstraint(
            model_name='habit',
            constraint=models.UniqueConstraint(fields=('user', 'title'), name='unique_habit_title'),
        ),
        migrations.AddConstraint(
            model_name='todo',
            constraint=models.UniqueConstraint(fields=('user', 'title'), name='unique_todo_title'),
        ),
    ]