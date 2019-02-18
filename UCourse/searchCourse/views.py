from django.shortcuts import render
from searchCourse.models import *
from searchCourse.serializers import *
from rest_framework import generics,viewsets
# Create your views here.

class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class TermViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Term.objects.all()
    serializer_class = TermSerializer

class CourseClassViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseClass.objects.all()
    serializer_class = CourseClassSerializer

class ClassTimeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ClassTime.objects.all()
    serializer_class = ClassTimeSerializer
