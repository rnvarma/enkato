from django.contrib import admin

from backend.models import *

# Register your models here.

class CustomeUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'get_name')

    def get_name(self, obj):
        return obj.first_name + " " + obj.last_name

admin.site.register(CustomUser, CustomeUserAdmin)
admin.site.register(Video)
admin.site.register(Classroom)
admin.site.register(Unit)
admin.site.register(Series)
admin.site.register(Playlist)