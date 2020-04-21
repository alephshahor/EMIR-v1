from rest_framework import serializers
from .models import StelarObjects

class StelarObjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StelarObjects
        fields = ('right_ascension','declination','priority')

