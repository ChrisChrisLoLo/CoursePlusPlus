from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialConnectView
# Create your views here.

class GoogleConnect(SocialConnectView):
  adapter_class = GoogleOAuth2Adapter