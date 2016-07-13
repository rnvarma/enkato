"""
Django settings for reactapp project.

Generated by 'django-admin startproject' using Django 1.9.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
TEMPLATES_DIR = os.path.join(ASSETS_DIR, 'templates')

HOME_DIR = os.path.join(BASE_DIR, 'home')
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')
AUTH_DIR = os.path.join(BASE_DIR, 'authentication')
CLASS_DIR = os.path.join(BASE_DIR, 'classroom')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'k3di=5f2_to8g!^(c_)6#9!uex9e65i4n&rllc*a@bu8l$(!#)'

# SECURITY WARNING: don't run with debug turned on in production!
if "ENKATO_SERVER" in os.environ and os.environ["ENKATO_SERVER"] == "PROD":
    DEBUG = False
else:
    DEBUG = True

ALLOWED_HOSTS = ['*']

LOGIN_URL = '/login'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'storages',
    'webpack_loader',
    'structabl',
    'home',
    'backend',
    'authentication',
    'classroom',
    'upload',
    'series'
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'reactapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            TEMPLATES_DIR
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'reactapp.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DEV_GLOBAL_DB = {
    'ENGINE': 'django_postgrespool',
    'NAME': 'enkatodev',
    'USER': 'enkatodev',
    'PASSWORD': 'khanacademy23',
    'HOST': 'enkato-dev.caubwydik7md.us-east-1.rds.amazonaws.com',
    'PORT': '5432'
}

DEV_LOCAL_DB = {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
}

PROD_DB = {
    'ENGINE': 'django_postgrespool',
    'NAME': 'enkatoprod',
    'USER': 'enkatoprod',
    'PASSWORD': 'khanacademy23',
    'HOST': 'enkato-prod.caubwydik7md.us-east-1.rds.amazonaws.com',
    'PORT': '5432'
}

DATABASES = {
    'default': DEV_GLOBAL_DB # if DEBUG else PROD_DB
}

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AWS_ACCESS_KEY_ID = 'AKIAIA5XRYWUZJOKIMFA'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'enkato-static-files'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME

MEDIAFILES_LOCATION = 'media'
MEDIA_URL = "https://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, MEDIAFILES_LOCATION)
DEFAULT_FILE_STORAGE = 'reactapp.storage.MediaStorage'

if DEBUG:
    STATIC_URL = '/static/'

    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'assets/'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
        os.path.join(BASE_DIR, 'images/')
    )

    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        }
    }
else:
    STATICFILES_LOCATION = 'static'
    STATICFILES_STORAGE = 'reactapp.storage.StaticStorage'
    STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, STATICFILES_LOCATION)

    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'assets/prod-assets/'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
        os.path.join(BASE_DIR, 'images/')
    )

    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'prod-bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-prod-stats.json'),
        }
    }


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'team@enkato.com'
EMAIL_HOST_PASSWORD = 'khanacademy23'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

ACCOUNT_ACTIVATION_DAYS = 1