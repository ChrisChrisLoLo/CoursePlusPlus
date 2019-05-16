cd /var/www/CoursePlusPlus/UCourse

pkill gunicorn

#/usr/bin/gunicorn --error-logfile /var/log/gunicorn/error.log -c gunicorn.py.ini UCourse.wsgi
/usr/bin/gunicorn3 -c gunicorn.py.ini UCourse.wsgi &

#Let server boot up
sleep 2

#Check if running
pgrep gunicorn && echo Running
pgrep gunicorn || echo Not running

cd /var/www/CoursePlusPlus/scripts
