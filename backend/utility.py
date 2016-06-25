from backend.models import *
import urllib
import json
import string

API_KEY = "AIzaSyCy8238lONTrmV2DdyDpBViFoqke3wuk7A"
BASE_URL = "https://www.googleapis.com/youtube/v3/videos?"

def capitalize(s):
    if not len(s): return ""
    return s[0].upper() + s[1:] 

def getYTIdFromURL(url):
    yt_id = url.split("v=")[1].split("&")[0]
    return yt_id

def convertSecondsToTime(s):
    minutes = s / 60
    seconds = s % 60
    return "%02d:%02d" % (minutes, seconds)

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

"""
returns:
{
    name: "",
    description: "",
    thumbnail: "",
    tags: [],
    duration: 0
}
"""
def getYTMetaData(yt_id):
    result = {}
    params = {}
    params["id"] = yt_id
    params["part"] = "snippet,contentDetails"
    params["key"] = API_KEY
    data = getDataFromURL(BASE_URL, params)
    if not data["pageInfo"]["totalResults"]: return None
    video_data = data["items"][0]
    metadata = video_data["snippet"]
    result["name"] = metadata["title"]
    result["description"] = metadata["description"]
    result["thumbnail"] = metadata["thumbnails"]["medium"]["url"]
    result["tags"] = metadata["tags"]
    yt_duration = video_data["contentDetails"]["duration"]
    result["duration"] = convertYTDurationToSeconds(yt_duration)
    return result




