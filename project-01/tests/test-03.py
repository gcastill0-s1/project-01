import json
import random
from datetime import datetime as dt, timezone

# Real-time UTC date
date = dt.now(timezone.utc)
unix_time = date.timestamp()

f = open("http_samples.json")

events = json.load(f)

event = random.choice(events)
event["time"] = unix_time

print(json.dumps(event))