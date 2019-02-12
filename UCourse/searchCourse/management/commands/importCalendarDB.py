import sqlite3
import os
from django.core.management.base import BaseCommand, CommandError
from searchCourse.models import *


class Command(BaseCommand):
    help = 'Load the course calendar into the application'

    def handle(self,*args,**kwargs):
        conn = sqlite3.connect('./scriptResources/calendar.db')
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        os.system('ls')
        cur.execute('SELECT * FROM faculties')
        row = cur.fetchone()
        while(row):
            print(row['facultyCode'],row['faculty'])
            Faculty.objects.get_or_create(
                code =  row['facultyCode'],
                name =  row['faculty']
                )
            row = cur.fetchone()

