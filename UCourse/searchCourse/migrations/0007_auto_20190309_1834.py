# Generated by Django 2.1.7 on 2019-03-10 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('searchCourse', '0006_auto_20190309_1727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='catalogCode',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]