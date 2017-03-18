"""
WSGI config for mysit project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysit.settings")
from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise



if "DYNO" in os.environ:
    from dj_static import Cling
    application = Cling(get_wsgi_application())
    application = DjangoWhiteNoise(application)
else:
    application = get_wsgi_application()
        
