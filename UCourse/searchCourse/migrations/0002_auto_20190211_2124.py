# Generated by Django 2.1.5 on 2019-02-12 04:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('searchCourse', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='units',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
    ]
