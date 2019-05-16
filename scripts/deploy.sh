#Build frontend (prod server is too weak to build on it's own)
npm run build --prefix ../frontend &&

#Deploy frontend (transfer built frontend)
scp -i "key.pem" -r ../frontend/build ubuntu@54.202.197.54:/var/www/CoursePlusPlus/UCourse/frontend

#Deploy backend (pull from github)
ssh -i "key.pem" ubuntu@54.202.197.54 "cd /var/www/CoursePlusPlus && git pull"


