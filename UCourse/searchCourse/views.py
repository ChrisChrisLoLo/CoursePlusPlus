from django.shortcuts import render
from searchCourse.models import *
from searchCourse.serializers import *
from searchCourse.paginations import *
from searchCourse.permissions import *

from rest_framework import mixins, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.exceptions import APIException


URL_PARAM_WHITELIST = ["page"]

# Create your views here.

# A superclass that adds methods to allow for searches via the querystring.
# handleUrlParam() must be implemented inorder to know how to call filterByParam()
class ReadOnlySearchModelViewSet(viewsets.ReadOnlyModelViewSet):
    # Get a query parameter value and filter the queryset against it.
    # Can optionally set the filter parameter name if it does not match that of the one used in the url query
    def filterByParam(self, urlParamName, urlParamIsInt, queryset, filterParamName=None):
        urlParamVal = self.request.query_params.get(urlParamName, None)
        if not filterParamName:
            filterParamName = urlParamName
        if urlParamVal:
            if urlParamIsInt:
                print(urlParamVal)
                urlParamVal = int(urlParamVal.strip("/"))
            queryset = queryset.filter(**{filterParamName: urlParamVal})
        return queryset

    def handleUrlParam(self, urlParamName, queryset):
        raise NotImplementedException

    def filterWithUrlParams(self, queryset):
        for urlParam in self.request.query_params.items():
            urlParamName = urlParam[0]
            if urlParamName not in URL_PARAM_WHITELIST:
                queryset = self.handleUrlParam(urlParamName, queryset)
        return queryset

    def returnPaginatedResponse(self, queryset):
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# class SearchModelViewSet(ReadOnlySearchModelViewSet,
#                          mixins.UpdateModelMixin,
#                          mixins.DestroyModelMixin):


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


class CourseViewSet(ReadOnlySearchModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = CourseListPagination

    def handleUrlParam(self, urlParamName, queryset):
        # print(urlParamName)
        if urlParamName == "asString":
            queryset = self.filterByParam(urlParamName, False, queryset)
        elif urlParamName == "subject":
            queryset = self.filterByParam(urlParamName, True, queryset)
        elif urlParamName == "minCourse":
            queryset = self.filterByParam(
                urlParamName, True, queryset, "catalogCode__gte"
            )
        elif urlParamName == "maxCourse":
            queryset = self.filterByParam(
                urlParamName, True, queryset, "catalogCode__lte"
            )
        elif urlParamName == "termNum":
            queryset = self.filterByParam(
                urlParamName, True, queryset, "courseclass__term_id"
            )
        else:
            raise ParseError(detail=urlParamName+" is an invalid parameter")
        # print(queryset)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = self.filterWithUrlParams(queryset)
        queryset = queryset.order_by("asString", "subject__code").distinct()
        return self.returnPaginatedResponse(queryset)


class TermViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Term.objects.all().order_by("-startDate").exclude(title__startswith="Continuing Ed")
    serializer_class = TermSerializer


class CourseClassViewSet(ReadOnlySearchModelViewSet):
    queryset = CourseClass.objects.all()
    serializer_class = CourseClassSerializer
    pagination_class = CourseClassListPagination

    def handleUrlParam(self, urlParamName, queryset):
        # print(urlParamName)
        if urlParamName == "course":
            queryset = self.filterByParam(urlParamName, False, queryset)
        elif urlParamName == "term":
            queryset = self.filterByParam(urlParamName, True, queryset)
        else:
            raise ParseError(detail=urlParamName+" is an invalid parameter")
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = self.filterWithUrlParams(queryset)

        queryset = queryset.prefetch_related("term")
        queryset = queryset.prefetch_related("classtime_set")

        queryset = queryset.order_by("-startDate")

        return self.returnPaginatedResponse(queryset)


class ClassTimeViewSet(ReadOnlySearchModelViewSet):
    queryset = ClassTime.objects.all()
    serializer_class = ClassTimeSerializer

    def handleUrlParam(self, urlParamName, queryset):
        # print(urlParamName)
        if urlParamName == "courseClass":
            queryset = self.filterByParam(urlParamName, True, queryset)
        else:
            raise ParseError(detail=urlParamName+" is an invalid parameter")
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = self.filterWithUrlParams(queryset)

        return self.returnPaginatedResponse(queryset)


class ClassCartViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, ReadOnlySearchModelViewSet):

    queryset = ClassCart.objects.all()
    serializer_class = ClassCartSerializer
    permission_classes = (permissions.IsAuthenticated,IsOwner)

    #Override to optionally get related information depending on what is needed
    def get_serializer_class(self):
        if self.action == 'list':
            return ClassCartRelatedSerializer
        if self.action == 'retrieve':
            return ClassCartRelatedSerializer
        if self.action == 'create':
            return ClassCartSerializer
        if self.action == 'partial_update':
            return ClassCartSerializer
        if self.action == 'destroy':
            return ClassCartSerializer
        return serializers.Default  # I dont' know what you want for create/destroy/update

    # Override the create method so that the user is set as the owner in the data model
    def create(self, request, *args, **kwargs):

        request.data['owner'] = request.user.id

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    # def create(self, request):
    #     obj = ClassCart.objects.create(owner=request.user,courseClass_id=request.data["courseClass"])

    def handleUrlParam(self, urlParamName, queryset):
        # print(urlParamName)
        if urlParamName == "term":
            queryset = self.filterByParam(urlParamName, True, queryset, "courseClass__term")
        else:
            raise ParseError(detail=urlParamName+" is an invalid parameter")
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.prefetch_related("courseClass").prefetch_related("courseClass__classtime_set")
        queryset = self.filterWithUrlParams(queryset)

        return self.returnPaginatedResponse(queryset)