cd ../UCourse &&
gunicorn -c gunicorn.py.ini UCourse.wsgi &
cd ../scripts
