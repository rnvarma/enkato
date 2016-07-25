from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from collections import defaultdict

class Serializers(object):
	@staticmethod
	def notifications_aggregator(notifications):
		groups = defaultdict(list)
		
		for obj in notifications:
			if obj.action_object == None:
				obj.delete()
			else:
				if obj.verb == 'new series video':
					groups[(obj.verb, obj.action_object.series.id)].append(obj)

				if obj.verb == 'new question':
 					groups[(obj.verb, obj.action_object.video.id)].append(obj)

				if obj.verb == 'new question response':
					groups[(obj.verb, obj.action_object.is_instructor, obj.action_object.question.id)].append(obj)

		aggregated_list = groups.values()

		return aggregated_list

	
	@staticmethod
	def notification_serializer(notifications):
		if len(notifications) == 0:
			return []
			
		sorted(notifications, key = lambda x : x.timestamp, reverse = True)
		first = notifications[0]
		verb = first.verb
		countint = len(notifications)
		count = str(countint)
		data = {}
		data["ids"] = map(lambda x : x.id, notifications)
		data["timestamp"] = first.timestamp

		if verb == 'new series video':
			username = first.actor.username
			seriesname = first.action_object.series.name
			seriesid = first.action_object.series.uuid
			videoid = first.action_object.video.uuid

			if countint > 1:
				data["description"] = username + ' added ' + count + ' videos to the series ' + seriesname
				data["link"] = '/s/' + seriesid
				return data

			else:
				data["description"] = username + ' added a video to the series ' + seriesname
				data["link"] = '/s/' + seriesid + '/watch#' + videoid
				return data

		if verb == 'new question':
			videoname = first.action_object.video.name
			seriesid = first.action_object.video.series_video.series.uuid
			videoid = first.action_object.video.uuid

			if countint > 1:
				data["description"] = count + ' new questions in the video ' + videoname
				data["link"] = '/s/' + seriesid + '/watch#' + videoid
				return data

			else:
				data["description"] = 'Someone asked a question in the video ' + videoname
				data["link"] = '/s/' + seriesid + '/watch#' + videoid
				return data

		if verb == 'new question response':
			videoname = first.action_object.question.video.name
			seriesid = first.action_object.question.video.series_video.series.uuid
			videoid = first.action_object.question.video.uuid

			if first.action_object.is_instructor:
				data["description"] = 'An instructor responded to your question in the video ' + videoname
				data["link"] = '/s/' + seriesid + '/watch#' + videoid
				return data


			if countint > 1:
				data["description"] = count + ' new responses to your question in the video ' + videoname
				data["link"] = '/s/' + seriesid + '/watch#' + videoid
				return data

			else:
				data["description"] = 'Someone responded to your question in the video ' + videoname
				data["link"] = '/s/' + seriesid + '/watch#' + videoid
				return data

	'''

	@staticmethod
	def notification_serializer(notification):
		data = {}
		data["timestamp"] = str(notification.timestamp)
		
		if notification.verb == 'new series video':
			data["description"] = notification.actor.username + ' added a series video'
			data["link"] = '/s/' + notification.action_object.series.uuid + '/watch#' + notification.action_object.video.uuid

		if notification.verb == 'new question':
			data["description"] = notification.actor.username + ' asked a question in ' + notification.action_object.video.name
			data["link"] = ""
			
		if notification.verb == 'new question response':
			data["description"] = notification.actor.username + ' answered your question ' + notification.action_object.question.title
			data["link"] = ""
		return data
	'''

class GetNotifications(View):
	def get(self, request):
		if request.user.is_anonymous():
			return JsonResponse({'notifications': [], 'num': "0"})
		else:
			unread = request.user.notifications.unread().all()

			if len(unread) == 0:
				return JsonResponse({'notifications': [{"description": "No new notifications at this time", "timestamp": ""}], 'num': "0"})

			aggregated_unread = map(Serializers.notification_serializer, Serializers.notifications_aggregator(unread))
			num = len(aggregated_unread)

			return JsonResponse({'notifications': sorted(aggregated_unread, key = lambda x : x["timestamp"], reverse = True),
							 'num': num})

class MarkAsRead(View):
	def post(self, request):
		if not request.user.is_anonymous():
			ids = request.POST.get('id')

			for n_id in ids:
				notification = Notifcation.objects.get(id=n_id)
				if notification is not None:
					if notification.recipient == request.user:
						notification.mark_as_read()

		return JsonResponse({})