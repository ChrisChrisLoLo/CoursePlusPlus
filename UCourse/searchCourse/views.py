from django.shortcuts import render
from searchCourse.models import *
from searchCourse.serializers import *
from searchCourse.paginations import *
from rest_framework import generics,viewsets
from rest_framework.response import Response

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
    pagination_class = SubjectListPagination

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = CourseListPagination
    QUERY_PARAMS = ("asString",)

    def filterByParam(self,paramName,queryset):
        #Cast as upper
        print(paramName)
        queryParam = self.request.query_params.get(paramName, None)
        print(queryParam)
        if queryParam is not None:
            queryset = queryset.filter(**{paramName:queryParam})
        return queryset

    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset())
        ##queryset = queryset.filter(**{"id":1})
        #Filter based on queryParams
        for queryParam in self.QUERY_PARAMS:
            queryset = self.filterByParam(queryParam,queryset)


        #print("SDF")
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class TermViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Term.objects.all()
    serializer_class = TermSerializer

class CourseClassViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseClass.objects.all()
    serializer_class = CourseClassSerializer

class ClassTimeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ClassTime.objects.all()
    serializer_class = ClassTimeSerializer
