from django.urls import path
from . import views

urlpatterns = [
    path('api/emir', views.StelarObjectsList.as_view()),
]