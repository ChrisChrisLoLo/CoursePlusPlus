from rest_framework import serializers
from searchCourse.models import *


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = '__all__'


class ClassTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassTime
        fields = '__all__'


class CourseClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseClass
        fields = '__all__'

class CourseClassRelatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseClass
        fields = '__all__'

    classtime_set = ClassTimeSerializer(read_only=True, many=True)


class ClassCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassCart
        fields = '__all__'

    def create(self, validated_data):
        # Copied from the django rest framework-modified to get or create records (prevent duplicates)
        ModelClass = self.Meta.model
        instance = ModelClass._default_manager.get_or_create(**validated_data)[0]
        return instance


class ClassCartRelatedSerializer(ClassCartSerializer):
    class Meta:
        model = ClassCart
        fields = '__all__'

    courseClass = CourseClassSerializer(read_only=True)




