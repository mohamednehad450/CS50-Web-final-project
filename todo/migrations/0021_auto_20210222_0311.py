# Generated by Django 3.0.8 on 2021-02-22 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0020_auto_20210222_0307'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habit',
            name='title',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]
