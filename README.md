# Configure an HTTP target for an Open Data Stream

1. Log in to the Administration settings on the ExtraHop system through `https://<extrahop-hostname-or-IP-address>/admin`.

2. In the System Configuration section, click **Open Data Streams**.

3. Add an **HTTPS** Target

|     |     |
| --- | --- |
| host  | ingest.us1.sentinelone.net    |
| Headers | "headers" : { <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Content-Type" : ["application/json"], <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Authorization" : ["Bearer  authToken"]<br>}    |

4. Configure Extra Headers

"Authorization: Bearer authToken"

### Example two

```json
{
    "path": "/services/collector/raw?sourcetype=extrahop",
    "headers": {
        "Content-Type" : ["application/json"],
        "Authorization" : ["Bearer authToken"]
    }
}
```