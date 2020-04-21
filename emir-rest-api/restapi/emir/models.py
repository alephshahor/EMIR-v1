from django.db import models

# Create your models here.
class StelarObjects(models.Model):
    
    right_ascension = models.FloatField()
    declination = models.FloatField()
    priority = models.IntegerField()

