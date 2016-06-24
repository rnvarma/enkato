from backend.models import *
import urllib
import json

API_KEY = "AIzaSyCy8238lONTrmV2DdyDpBViFoqke3wuk7A"
BASE_URL = "https://www.googleapis.com/youtube/v3/videos?"

def convertSecondsToTime(s):
    minutes = s / 60
    seconds = s % 60
    return "%02d:%02d" % (minutes, seconds)

def getDataFromURL(base_url, params):
    data = None
    params_str = urllib.urlencode(params)
    request_url = base_url + params_str
    response = urllib.urlopen(request_url)
    # first read the response from the response object
    data = response.read()
    # now decode it from bytes to string
    data = data.decode("utf-8")
    # now parse the string into a python object of dictionaries and lists
    data = json.loads(data)
    response.close()
    return data

def getVideoMetaData(yt_id):
    params = {}
    params["id"] = yt_id
    params["part"] = "snippet"
    params["key"] = API_KEY
    data = getDataFromURL(BASE_URL, params)
    if not data["pageInfo"]["totalResults"]: return None
    video_data = data["items"][0]
    return video_data["snippet"]





