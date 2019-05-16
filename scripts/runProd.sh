cd /var/www/CoursePlusPlus/UCourse &&
    pkill gunicorn
	gunicorn --error-logfile /var/log/gunicorn/error.log -c gunicorn.py.ini UCourse.wsgi &
cd /var/www/CoursePlusPlus/scripts
