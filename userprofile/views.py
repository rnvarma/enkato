from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

class UserProfile(View):
    def get(self, request, u_id):
        if not u_id: u_id = request.user.customuser.id
        print u_id
        return render(request, 'userprofile/profile.html', {'u_id': u_id})

class Serializers(object):
	@staticmethod
	def notification_serializer(notification):
		data = {}
		data["description"] = notification.description
		return data

class GetNotifications(View):
	def get(self, request):
		unread = map(Serializers.notification_serializer, request.user.notifications.unread().all())
		#notifications.mark_all_as_read()
		num = len(unread)
		return JsonResponse({'notifications': unread,
							 'num': num})

class GetNotificationsNum(View):
	def get(self, request):
		return JsonResponse({'num': request.user.notifications.unread().count()})