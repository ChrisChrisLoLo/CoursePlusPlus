cd ../UCourse &&
	gunicorn --error-logfile /var/log/gunicorn/error.log -c gunicorn.py.ini UCourse.wsgi &
cd ../scripts