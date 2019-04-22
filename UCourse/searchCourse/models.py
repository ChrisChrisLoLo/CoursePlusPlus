from django.db import models
from django.conf import settings

# Notes on schema reasoning:
# -Surrogate key used since compostie keys are not fully supported. New solutions may be needed
# If queries on courseClasses are sluggish. Remember to keep the schema seed friendly.


class Faculty(models.Model):
    code = models.CharField(max_length=2, unique=True, null=False)
    name = models.CharField(max_length=60, blank=True, null=True)


class Department(models.Model):
    code = models.CharField(max_length=10, unique=True, null=False)
    name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.ForeignKey('Faculty', on_delete=models.CASCADE)


class Subject(models.Model):
    code = models.CharField(max_length=6, unique=True, null=False)
    name = models.CharField(max_length=120, blank=True, null=True)
    department = models.ForeignKey('Department', on_delete=models.CASCADE)


class Course(models.Model):
    code = models.IntegerField(unique=True, null=False)
    # Catalog code is the code the 101 in COURS 101. Code is the id given to it by the LDAP system
    # Catalog code not an int since there can alphabetical chars in them
    catalogCode = models.CharField(max_length=5, blank=True, null=True)
    title = models.CharField(max_length=120, blank=True, null=True)
    description = models.CharField(max_length=1600, blank=True, null=True)
    career = models.CharField(max_length=10, blank=True, null=True)
    units = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)
    asString = models.CharField(max_length=12, blank=True, null=True)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)


class Term(models.Model):
    code = models.IntegerField(unique=True, null=False)
    title = models.CharField(max_length=40, blank=True, null=True)
    startDate = models.DateField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)


class CourseClass(models.Model):
    code = models.IntegerField(unique=True, null=False)
    calendarCode = models.IntegerField(null=False)
    section = models.CharField(max_length=5, blank=True, null=True)
    component = models.CharField(max_length=3, blank=True, null=True)
    classType = models.CharField(max_length=1, blank=True, null=True)
    status = models.CharField(max_length=1, blank=True, null=True)
    enrollStatus = models.CharField(max_length=1, blank=True, null=True)
    capacity = models.IntegerField(blank=True, null=True)
    startDate = models.DateField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)
    session = models.CharField(max_length=33, blank=True, null=True)
    campus = models.CharField(max_length=4, blank=True, null=True)
    location = models.CharField(max_length=32, blank=True, null=True)
    autoEnroll = models.CharField(max_length=5, blank=True, null=True)
    topic = models.CharField(max_length=64, blank=True, null=True)
    notes = models.CharField(max_length=400, blank=True, null=True)
    consent = models.CharField(max_length=16, blank=True, null=True)
    gradingBasis = models.CharField(max_length=16, blank=True, null=True)
    instructionMode = models.CharField(max_length=16, blank=True, null=True)
    units = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)
    classUrl = models.CharField(max_length=64, blank=True, null=True)
    instructorUId = models.CharField(max_length=12, blank=True, null=True)
    examStatus = models.CharField(max_length=9, blank=True, null=True)
    examDate = models.DateField(blank=True, null=True)
    examStartTime = models.CharField(max_length=8, blank=True, null=True)
    examEndTime = models.CharField(max_length=8, blank=True, null=True)
    examLocation = models.CharField(max_length=16, blank=True, null=True)
    asString = models.CharField(max_length=32, blank=True, null=True)
    term = models.ForeignKey('Term', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)


class ClassTime(models.Model):
    code = models.IntegerField(unique=True, null=False)
    day = models.CharField(max_length=7, blank=True, null=True)
    startTime = models.CharField(max_length=8, blank=True, null=True)
    endTime = models.CharField(max_length=9, blank=True, null=True)
    location = models.CharField(max_length=16, blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)
    startDate = models.DateField(blank=True, null=True)
    courseClass = models.ForeignKey('CourseClass', on_delete=models.CASCADE)


class ClassCart(models.Model):
    courseClass = models.ForeignKey('CourseClass', on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

# class Textbook(models.Model):
#     code = models.CharField(max_length=16,unique=True,null=False)
#     status = models.CharField(max_length=3, blank=True, null=True)
#     title = models.CharField(max_length=64, blank=True, null=True)
#     isbn = models.CharField(max_length=13, blank=True, null=True)
#     author = models.CharField(max_length=32, blank=True, null=True)
#     publisher = models.CharField(max_length=32, blank=True, null=True)
#     edition = models.IntegerField(blank=True, null=True)
#     year = models.IntegerField(blank=True, null=True)
#     courseClass= models.ForeignKey('CourseClass',on_delete=models.CASCADE)
