# Generated by Django 3.0.8 on 2021-02-22 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0022_auto_20210222_0315'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='habitentry',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='habitentry',
            constraint=models.UniqueConstraint(fields=('habit', 'date'), name='unique_date'),
        ),
    ]