# Generated by Django 3.0.8 on 2021-02-22 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0023_auto_20210222_0339'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='habit',
            constraint=models.UniqueConstraint(fields=('user', 'title'), name='unique_title'),
        ),
    ]
