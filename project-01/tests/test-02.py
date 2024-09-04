import calendar
import datetime
import json

date = datetime.datetime.utcnow()
utc_time = calendar.timegm(date.utctimetuple())
print(utc_time)

f = open("http_samples.json")

events = json.load(f)

for e in events:
    print(json.dumps(e))