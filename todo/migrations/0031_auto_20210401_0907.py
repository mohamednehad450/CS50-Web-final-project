# Generated by Django 3.0.8 on 2021-04-01 09:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0030_auto_20210331_1855'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pomodorointerval',
            name='todo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='intervals', to='todo.Todo'),
        ),
    ]
