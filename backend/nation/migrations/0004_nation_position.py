# Generated by Django 4.2 on 2025-05-03 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nation', '0003_rename_image_url_nationimage_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='nation',
            name='position',
            field=models.JSONField(default=list, verbose_name='Координаты'),
        ),
    ]
