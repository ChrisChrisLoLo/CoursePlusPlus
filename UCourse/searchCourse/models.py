from django.db import models

#Notes on schema reasoning:
#-Surrogate key used since compostie keys are not fully supported. New solutions may be needed
# If queries on courseClasses are sluggish. Remember to keep the schema seed friendly.

class Faculty(models.Model):
    code = models.CharField(max_length=2, unique=True, null=False)
    name = models.CharField(max_length=60, blank=True, null=True)


class Department(models.Model):
    code = models.CharField(max_length=10, unique=True, null=False)
    name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.ForeignKey('Faculty',on_delete=models.CASCADE)

class Subject(models.Model):
    code = models.CharField(max_length=6, unique=True, null=False)
    name = models.CharField(max_length=120, blank=True, null=True)
    department = models.ForeignKey('Department',on_delete=models.CASCADE)

class Course(models.Model):
    code = models.IntegerField(unique=True, null=False)
    catalogCode = models.CharField(max_length=3, blank=True, null=True)
    title = models.CharField(max_length=120, blank=True, null=True)
    description = models.CharField(max_length=1600, blank=True, null=True)
    career = models.CharField(max_length=10, blank=True, null=True)
    units = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    asString = models.CharField(max_length=12, blank=True, null=True)
    subject = models.ForeignKey('Course',on_delete=models.CASCADE)

class Term(models.Model):
    code = models.IntegerField(unique=True, null=False)
    title = models.CharField(max_length=40, blank=True, null=True)
    startDate = models.DateField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)

class CourseClass(models.Model):

    code = models.IntegerField(unique=True,null=False)  # Field renamed because it was a Python reserved word.
    section = models.CharField(max_length=5, blank=True, null=True)
    component = models.CharField(max_length=3, blank=True, null=True)
    classtype = models.CharField(db_column='classType', max_length=1, blank=True, null=True)  # Field name made lowercase.
    classstatus = models.CharField(db_column='classStatus', max_length=1, blank=True, null=True)  # Field name made lowercase.
    enrollstatus = models.CharField(db_column='enrollStatus', max_length=1, blank=True, null=True)  # Field name made lowercase.
    capacity = models.IntegerField(blank=True, null=True)
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='endDate', blank=True, null=True)  # Field name made lowercase.
    session = models.CharField(max_length=33, blank=True, null=True)
    campus = models.CharField(max_length=4, blank=True, null=True)
    location = models.CharField(max_length=32, blank=True, null=True)
    autoenroll = models.CharField(db_column='autoEnroll', max_length=5, blank=True, null=True)  # Field name made lowercase.
    classtopic = models.CharField(db_column='classTopic', max_length=64, blank=True, null=True)  # Field name made lowercase.
    classnotes = models.CharField(db_column='classNotes', max_length=400, blank=True, null=True)  # Field name made lowercase.
    consent = models.CharField(max_length=16, blank=True, null=True)
    gradingbasis = models.CharField(db_column='gradingBasis', max_length=16, blank=True, null=True)  # Field name made lowercase.
    instructionmode = models.CharField(db_column='instructionMode', max_length=16, blank=True, null=True)  # Field name made lowercase.
    units = models.TextField(blank=True, null=True)  # This field type is a guess.
    classurl = models.CharField(db_column='classURL', max_length=64, blank=True, null=True)  # Field name made lowercase.
    instructoruid = models.CharField(db_column='instructorUId', max_length=12, blank=True, null=True)  # Field name made lowercase.
    examstatus = models.CharField(db_column='examStatus', max_length=9, blank=True, null=True)  # Field name made lowercase.
    examdate = models.DateField(db_column='examDate', blank=True, null=True)  # Field name made lowercase.
    examstarttime = models.CharField(db_column='examStartTime', max_length=8, blank=True, null=True)  # Field name made lowercase.
    examendtime = models.CharField(db_column='examEndTime', max_length=8, blank=True, null=True)  # Field name made lowercase.
    examlocation = models.CharField(db_column='examLocation', max_length=16, blank=True, null=True)  # Field name made lowercase.
    asstring = models.CharField(db_column='asString', max_length=32, blank=True, null=True)  # Field name made lowercase.

    term = models.IntegerField(blank=True, null=True)
    course = models.IntegerField(blank=True, null=True)


class Classtime(models.Model):
    classtime = models.IntegerField(db_column='classTime', primary_key=True, blank=True, null=True)  # Field name made lowercase.
    class_field = models.IntegerField(db_column='class', blank=True, null=True)  # Field renamed because it was a Python reserved word.
    day = models.CharField(max_length=7, blank=True, null=True)
    starttime = models.CharField(db_column='startTime', max_length=8, blank=True, null=True)  # Field name made lowercase.
    endtime = models.CharField(db_column='endTime', max_length=9, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(max_length=16, blank=True, null=True)
    enddate = models.DateField(db_column='endDate', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'classTimes'

class Textbook(models.Model):
    class_field = models.IntegerField(db_column='class', blank=True, null=True)  # Field renamed because it was a Python reserved word.
    textbook = models.CharField(unique=True, max_length=16, blank=True, null=True)
    uofatxstatus = models.CharField(db_column='uOfATxStatus', max_length=3, blank=True, null=True)  # Field name made lowercase.
    uofatxtitle = models.CharField(db_column='uOfATxTitle', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uofatxisbn = models.CharField(db_column='uOfATxISBN', max_length=13, blank=True, null=True)  # Field name made lowercase.
    uofatxauthor = models.CharField(db_column='uOfATxAuthor', max_length=32, blank=True, null=True)  # Field name made lowercase.
    uofatxpublisher = models.CharField(db_column='uOfATxPublisher', max_length=32, blank=True, null=True)  # Field name made lowercase.
    uofatxedition = models.IntegerField(db_column='uOfATxEdition', blank=True, null=True)  # Field name made lowercase.
    uofatxyear = models.IntegerField(db_column='uOfATxYear', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'textbooks'
