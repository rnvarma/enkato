from django.conf.urls import url
from django.contrib import admin
from django.views.decorators.csrf import ensure_csrf_cookie

from authentication.views import *

urlpatterns = [
    url(r'^login$', ensure_csrf_cookie(Login.as_view())),
    url(r'^register$', ensure_csrf_cookie(Register.as_view())),
    url(r'^logout$', Logout.as_view())
]