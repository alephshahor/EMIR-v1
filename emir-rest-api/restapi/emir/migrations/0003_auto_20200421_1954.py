import csv
from django.db import migrations


def load_catalog(apps, schema_editor):
    StelarObjects = apps.get_model('emir', 'StelarObjects')
    for line in open("C:\\Users\\Adrián Álvarez\\Documents\\Emir\\emir-rest-api\\restapi\\emir\\catalogs\\catalog1.csv").readlines():
        line = line.strip().split(',')
        StelarObjects(right_ascension=line[0], declination=line[1],priority=line[2]).save()

class Migration(migrations.Migration):

    dependencies = [
       ('emir', '0002_auto_20200421_1916'),
    ]

    operations = [
        migrations.RunPython(load_catalog)
    ]
