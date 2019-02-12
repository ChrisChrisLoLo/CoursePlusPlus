import sqlite3
from decimal import Decimal
import os
from django.core.management.base import BaseCommand, CommandError
from searchCourse.models import *


class Command(BaseCommand):
    help = 'Load the course calendar into the application'

    def handle(self,*args,**kwargs):
        conn = sqlite3.connect('./scriptResources/transformed.sqlite3')
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()


        #Get Faculties
        cur.execute('SELECT * FROM faculties')
        row = cur.fetchone()
        while(row):
            print(row['facultyCode'],row['faculty'])
            Faculty.objects.get_or_create(
                code =  row['facultyCode'],
                name =  row['faculty']
                )
            row = cur.fetchone()

        #Get Departments
        cur.execute('SELECT * FROM departments')
        row = cur.fetchone()
        while(row):
            print(row['facultyCode'],row['departmentCode'],row['department'])
            facultyObj = Faculty.objects.get(code = row['facultyCode']) 
            Department.objects.get_or_create(
                code =  row['departmentCode'],
                name =  row['department'],
                faculty = facultyObj
                )
            row = cur.fetchone()

        #Get Subjects
        cur.execute('SELECT * FROM subjects')
        row = cur.fetchone()
        while(row):
            deptObj = Department.objects.get(code = row['departmentCode']) 
            Subject.objects.get_or_create(
                code =  row['subject'],
                name =  row['subjectTitle'],
                department = deptObj
                )
            row = cur.fetchone()

        #Get Courses
        cur.execute('SELECT * FROM courses')
        row = cur.fetchone()
        while(row):
            #print('!',row['subject'],row['course'],row['catalog'],row['courseTitle'],row['courseDescription'],row['career'],row['units'],row['asString'],'!')
            #print(row['units'])
            #print(type(row['units']))
            subjObj = Subject.objects.get(code = row['subject']) 
            Course.objects.get_or_create(
                code =  row['course'],
                catalogCode =  row['catalog'],
                title = row['courseTitle'],
                description = row['courseDescription'],
                career= row['career'],
                units = row['units'],
                asString = row['asString'],
                subject = subjObj,
                )
            row = cur.fetchone()
        
        #Get Terms
        cur.execute('SELECT * FROM terms')
        row = cur.fetchone()
        while(row):
            #print(row['units'])
            #print(type(row['units']))
            Term.objects.get_or_create(
                code =  row['term'],
                title = row['termTitle'],
                startDate = row['startDate'],
                endDate = row['endDate']
                )
            row = cur.fetchone()

        #Get CourseClass
        cur.execute('SELECT * FROM ')