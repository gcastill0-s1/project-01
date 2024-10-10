// s1_ODS_target is configured as a target for an Open Data Stream
const SENTINELONE_ODS_TARGET = "s1_ODS_target";
const CONTEXT = "SentinelOne Test";
const SENTINELONE_PATH = "/services/collector/raw?sourcetype=extrahop";

// Check if the event is HTTP_RESPONSE to capture transaction data

if ( event === HTTP_REQUEST ) {
  // Create a JSON object with full record
  var jsonData = HTTP.record;

  // Convert the JSON object to a string
  var jsonString = JSON.stringify(jsonData);

  // Send the JSON data to the webhook URL using an HTTP POST request
  Remote.HTTP( SENTINELONE_ODS_TARGET ).post({
    'path': SENTINELONE_PATH,
    'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    'payload': jsonString,
    'context': {
        'action': CONTEXT,
    },
    'enableResponseEvent': true,
  });

  debug(`version: ${version} | Sent test payload to SentinelOne`);

} else if ( event === 'REMOTE_RESPONSE' ) {
  var rsp = Remote.response,
      rspStatus = rsp.status || '',
      rspBody = rsp.body || '',
      rspHeaders = rsp.headers || '',
      rspTime = rsp.time || '',
      rspError = rsp.error || '';

  if ( context instanceof Object && context.action === CONTEXT ) {
    debug(`version: ${version} | statusCode: ${rspStatus} | responseTime: ${rspTime} | responseHeaders: ${rspHeaders} | responseBody: ${rspBody}`);
  }
}
