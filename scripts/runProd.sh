cd /var/www/CoursePlusPlus/UCourse

pkill gunicorn

gunicorn --error-logfile /var/log/gunicorn/error.log -c gunicorn.py.ini UCourse.wsgi &

#Let server boot up
sleep 5

#Check if running
pgrep gunicorn && echo Running
pgrep gunicorn || echo Not running

cd /var/www/CoursePlusPlus/scripts
