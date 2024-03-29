from backend.models import *
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import argparser, run_flow

import httplib2
import os
import sys
import urllib
import json
import string
import re
import unicodedata

# API docs: https://developers.google.com/youtube/v3/docs/videos
API_KEY = "AIzaSyCy8238lONTrmV2DdyDpBViFoqke3wuk7A"
VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos?"
PLAYLIST_URL = "https://www.googleapis.com/youtube/v3/playlistItems?"
YOUTUBE_READ_WRITE_SCOPE = "https://www.googleapis.com/auth/youtube"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def youtubeSearch(channelId):
  	youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=API_KEY)
	
	searchResponse = youtube.channels().list(
		part="snippet",
		id = channelId,
	).execute()
  	return searchResponse

def capitalize(s):
	if not len(s): return ""
	return s[0].upper() + s[1:]

def getYTIdFromVideoData(video):
	return video.vid_id

def getThumbnailFromVideoData(video):
	return video.thumbnail

def getUUIDFromVideoData(video):
	return video.uuid

def getTitlesFromVideoData(video):
	return video.name

def findSeriesVideoData(seriesData, v_id):
	uuids = seriesData.keys()
	data = seriesData.values()
	response={}
	vidIds =[]
	vidThumbnails = []
	vidUUIDs =[]
	vidTitles=[]
	for seriesInfo in data:
		vidThumbnails.append(seriesInfo.get("thumbnails"))
		vidIds.append(seriesInfo.get("videoIDs"))
		vidUUIDs.append(seriesInfo.get("videoUUIDs"))
		vidTitles.append(seriesInfo.get("videoTitles"))
	for seriesVidIds in vidIds:
		for vidId in seriesVidIds:
			if vidId == v_id:
				index = vidIds.index(seriesVidIds)
				response["seriesUUID"]= uuids[index]
				response["seriesThumbnails"]=vidThumbnails[index]
				response["videoUUIDs"] = vidUUIDs[index]
				response["videoTitles"] = vidTitles[index]
				return response
	return None


def getYTIdFromURL(url):
	""" Gets video id from url or returns None if the id doesn't seem right """

	# TODO: Add proper validation for the 24 different possible YouTube strings
	# http://stackoverflow.com/questions/2964678/jquery-youtube-url-validation-with-regex

	yt_id = None
	if "v=" in url:
		yt_id = url.split("v=")[1].split("&")[0]
		if len(yt_id) < 11:
			yt_id = None

	return yt_id

def convert_time_to_seconds(time):
	result = time.split(":")
	h, m, s = 0, 0, 0
	if len(result) < 1:
		return None
	elif len(result) == 1:
		s = int(result[0])
	elif len(result) == 2:
		m = int(result[0])
		s = int(result[1])
	elif len(result) == 3:
		h = int(result[0])
		m = int(result[1])
		s = int(result[2])
	elif len(result) > 3:
		return None
	return h * 60 * 60 + m * 60 + s

def getYTPlaylistIdFromURL(url):
	return url.split("list=")[1].split("&")[0]


def convert_seconds_to_duration(secs):
	""" Seconds to h:mm:ss """

	minutes, seconds = divmod(secs, 60)
	hours, minutes = divmod(minutes, 60)
	if not hours:
		return "{}:{:02}".format(minutes, seconds)
	return "{}:{:02}:{:02}".format(hours, minutes, seconds)


def sanetizeTime(s):
	""" Seconds to 4h 20m """

	minutes = s / 60
	seconds = s % 60
	hours = minutes / 60
	minutes = minutes % 60
	if not hours and not minutes:
		return "%ds" % seconds
	elif not hours:
		return "%dm" % minutes
	else:
		return "%dh %dm" % (hours, minutes)


def convertYTDurationToSeconds(yt_dur):
	seconds = 0
	times = yt_dur[2:]

	def getNextNum(s):
		num = ""
		while s and s[0] in string.digits:
			num += s[0]
			s = s[1:]
		num = int(num)
		denom = s[0]
		s = s[1:]
		return (num, denom, s)

	while times:
		num, denom, times = getNextNum(times)
		seconds += num if denom == "S" else (num * 60) if denom == "M" else (num * 60 * 60)
	return seconds


def getDataFromURL(url, params):
	""" Contacts api at base_url with params and returns data retrieved """

	params_str = urllib.urlencode(params)  # encodes into GET parameters
	request_url = url + params_str
	response = urllib.urlopen(request_url)

	# first read the response from the response object
	data = response.read()
	# now decode it from bytes to string
	data = data.decode("utf-8")
	# now parse the string into a python object of dictionaries and lists
	data = json.loads(data)
	response.close()

	return data


def getInfoFromYTSnippet(video_data):
	return {
		'id': video_data['id'],
		'name': video_data['snippet']['title'],
		'description': video_data['snippet']['description'],
		'thumbnail': video_data['snippet']['thumbnails']['medium']['url'],
		'tags': video_data['snippet']['tags'] if 'tags' in video_data['snippet'] else [],
		'duration': convertYTDurationToSeconds(video_data['contentDetails']['duration'])
	}


def getPlaylistVideos(p_id):
	params = {
		'maxResults': 50,
		'part': 'snippet,contentDetails',
		'playlistId': p_id,
		'key': API_KEY
	}

	data = getDataFromURL(PLAYLIST_URL, params)

	results = data["items"]
	totalResults = data["pageInfo"]["totalResults"]
	retrievedResults = data["pageInfo"]["resultsPerPage"]

	while retrievedResults < totalResults:
		params["pageToken"] = data["nextPageToken"]
		data = getDataFromURL(PLAYLIST_URL, params)
		results.append(data["items"])
		retrievedResults += data["pageInfo"]["resultsPerPage"]

	ids = map(lambda d: d["contentDetails"]["videoId"], results)
	orders = {d["contentDetails"]["videoId"]: d["snippet"]["position"] for d in results}

	params = {
		'maxResults': 50,
		'part': 'snippet,contentDetails',
		'id': ",".join(ids),
		'key': API_KEY
	}

	data = getDataFromURL(VIDEO_URL, params)

	results = data["items"]
	totalResults = data["pageInfo"]["totalResults"]
	retrievedResults = data["pageInfo"]["resultsPerPage"]

	while retrievedResults < totalResults:
		params["pageToken"] = data["nextPageToken"]
		data = getDataFromURL(VIDEO_URL, params)
		results.append(data["items"])
		retrievedResults += data["pageInfo"]["resultsPerPage"]

	data = map(getInfoFromYTSnippet, results)
	for video_data in data:
		video_data["order"] = orders[video_data["id"]]
	return data


def getYTMetaData(yt_id):
	""" See https://developers.google.com/youtube/v3/docs/videos for API details """

	params = {
		'id': yt_id,
		'part': "snippet,contentDetails",
		'key': API_KEY
	}

	data = getDataFromURL(VIDEO_URL, params)
	if not data['pageInfo']['totalResults']: return None  # no results

	# search by id will only yield one result
	video_data = data['items'][0]

	return getInfoFromYTSnippet(video_data)


def getStringsFromStringList(strings):
	""" Supports string seperated by new lines or commas """

	strings = strings.splitlines()
	strings = map(lambda l: l.split(","), strings)  # in case commas are involved

	# flatten strings in case some were actually comma seperated
	string_list = []
	map(lambda l: string_list.extend(l), strings)

	# remove empty string
	string_list = filter(lambda s: s, string_list)

	return string_list


def getSeriesThumbnails(series):
    series_videos = series.videos.all()
    thumbnails = []
    num_videos = series_videos.count()
    if (0 < num_videos < 4):
        thumbnails.append(series_videos[0].video.thumbnail)
    elif (num_videos >= 4): 
        thumbnails.append(series_videos[0].video.thumbnail)
        thumbnails.append(series_videos[1].video.thumbnail)
        thumbnails.append(series_videos[2].video.thumbnail)
        thumbnails.append(series_videos[3].video.thumbnail)
    return thumbnails

def parseTopicUploadString(s):
	topics = []
	regex = '(?P<time>([0-9]+:)?[0-9]+:[0-9]+)'
	for line in s.splitlines():
		match = re.search(regex, line)
		if not match: continue
		time = match.group(0)
		if not time: continue
		time = convert_time_to_seconds(time)
		name = line[:match.start()] + line[match.end():]
		name = name.strip()
		topics.append({'time': time, 'name': name})
	return topics

def youtubeData():
	params = {
		'id': 'y78GuOxNz84',
		'part': "snippet",
		'key': API_KEY
	}
	data = getDataFromURL(VIDEO_URL, params)
	items = data['items'][0]
	snippet = items['snippet']
	channelId = snippet['channelId'].encode('ascii', 'ignore')
	channelSearches = youtubeSearch(channelId)
	return channelSearches