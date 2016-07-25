from django.apps import AppConfig

class ApiConfig(AppConfig):
    name = 'reactapp'

    def ready(self):
        from . import signals