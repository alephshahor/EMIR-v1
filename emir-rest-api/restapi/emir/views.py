from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import StelarObjects
from .serializers import StelarObjectsSerializer

@api_view(['GET', 'POST'])
def stelar_objects_list(request, format=None):
    if request.method == 'GET':
        print("Hi!")
        data = StelarObjects.objects.all()

        serializer = StelarObjectsSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StelarObjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'GET', 'DELETE'])
def stelar_objects_detail(request, pk, format=None):
    try:
        print("Hi")
        stelar_object = StelarObjects.objects.get(pk=pk)
    except StelarObjects.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StelarObjectsSerializer(stelar_object, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        stelar_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'GET':
        serializer = StelarObjectsSerializer(stelar_object)
        return Response(serializer.data)