from django.shortcuts import render
from .models import StelarObjects
from .serializers import StelarObjectsSerializer
from rest_framework import generics

# Create your views here.
class StelarObjectsList(generics.ListCreateAPIView):
    queryset = StelarObjects.objects.all()
    serializer_class = StelarObjectsSerializer