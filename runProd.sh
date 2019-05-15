cd ./UCourse &
pipenv run gunicorn ./UCourse/wsgi.py &
cd ..