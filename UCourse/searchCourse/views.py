from django.shortcuts import render
from searchCourse.models import *
from searchCourse.serializers import *
from searchCourse.paginations import *
from rest_framework import generics,viewsets
from rest_framework.response import Response
from rest_framework.exceptions import APIException


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

    #Get a query parameter value and filter the queryset against it.
    #Can optionally set the filter parameter name if it does not match that of the one used in the url query
    def filterByParam(self,urlParamName,urlParamIsInt,queryset,filterParamName=None):
        urlParamVal = self.request.query_params.get(urlParamName, None)
        if not filterParamName:
            filterParamName = urlParamName
        if urlParamVal is not None:
            if urlParamIsInt:
                urlParamVal = int(urlParamVal)
            queryset = queryset.filter(**{filterParamName:urlParamVal})
            print(filterParamName,urlParamVal)
        return queryset

    def handleUrlParam(self, urlParamName,queryset):
        print(urlParamName)
        if urlParamName == "asString" or urlParamName == "subject":
            queryset = self.filterByParam(urlParamName,False,queryset)
        if urlParamName == "subject":
            queryset = self.filterByParam(urlParamName,True,queryset)
        elif urlParamName == "minCourse":
            queryset = self.filterByParam(urlParamName,True,queryset,"catalogCode__gte")
        elif urlParamName == "maxCourse":
            queryset = self.filterByParam(urlParamName,True,queryset,"catalogCode__lte")
        print(queryset)
        return queryset


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        ##queryset = queryset.filter(**{"id":1})
        #Filter based on queryParams
        # for queryParam in self.QUERY_PARAMS:
        #     queryset = self.filterByParam(queryParam,queryset)
        for urlParam in request.query_params.items():
            
            queryset = self.handleUrlParam(urlParam[0],queryset)
            
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
