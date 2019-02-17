from django.shortcuts import render
from searchCourse.models import *
from searchCourse.serializers import *
from rest_framework import generics,viewsets
# Create your views here.

class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer