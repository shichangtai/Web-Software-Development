"""mysit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.generic import RedirectView
from game.views import *
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/',include('django.contrib.auth.urls')),
    url(r'^$',user_login),
    url(r'^login/$',user_login),
    url(r'^logo/$', logo_login),
    url(r'^login/forgetpassword/$',forget_password),
    url(r'^login/resetpassword/(.*)/$',set_new_password),
    url(r'^category/(.*)/$',category),
    url(r'^activate/(.*)/$',active_user),
    url(r'^account/password/(.*)/$',set_new_password),
    url(r'^accountManager/$',management),
    url(r'^search/$',search_game),
    url(r'^contact/$',contact),
    url(r'^(.*)/usergame/$',usergame),
    url(r'^usergame/$',usergame),
    url(r'^pay/(.*)/$', payment),
    url(r'^play/(.*)/$', play, name='play'),
    url(r'^edit/(.*)/$', game_edit),
    url(r'^payment/(.*)/?.*/$',payment_success),
    url(r'^gameInfo/(.*)/$', gameInfo),
    url(r'^mygame/$',TemplateView.as_view(template_name='mygame.html'))
]
