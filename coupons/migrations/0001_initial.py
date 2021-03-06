# Generated by Django 3.0.4 on 2020-04-15 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coupon_title', models.CharField(max_length=100)),
                ('coupon_summary', models.TextField(max_length=400)),
                ('coupon_pubdate', models.DateTimeField()),
                ('coupon_validity', models.DurationField()),
            ],
        ),
    ]
