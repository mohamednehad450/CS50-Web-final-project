# Generated by Django 3.0.8 on 2021-03-31 18:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0029_auto_20210327_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='tag',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='todo.Tag'),
        ),
    ]