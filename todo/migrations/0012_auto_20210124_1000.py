# Generated by Django 3.0.8 on 2021-01-24 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0011_auto_20210101_0015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='step',
            name='title',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(max_length=150),
        ),
    ]