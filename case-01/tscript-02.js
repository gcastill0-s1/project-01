// s1_ODS_target is configured as a target for an Open Data Stream
const SENTINELONE_ODS_TARGET = "s1_ODS_target";
const CONTEXT = "SentinelOne Test";
const SENTINELONE_PATH = "/services/collector/raw?sourcetype=extrahop";

// Check if the event is HTTP_REQUEST to capture transaction data

if ( event === HTTP_REQUEST ) {
  // Create a JSON object with all relevant transaction data fields
  var jsonData = {
    protocol: HTTP.encryptionProtocol, // Determine the protocol
    client_ip: HTTP.origin.toString(), // Client IP address
    server_ip: HTTP.host.toString(), // Server IP address
    method: HTTP.method, // HTTP method (GET, POST, etc.)
    uri: HTTP.uri, // URI accessed
    request_headers: HTTP.findHeaders("Request"), // HTTP request headers
    response_headers: HTTP.findHeaders("Response"), // HTTP response headers
    user_agent: HTTP.userAgent, // User agent string
    content_type: HTTP.findHeaders("Content-"), // Response content type
    referrer: HTTP.referer, // Referer if specified
  };

  if (HTTP.xss) {
    jsonData["xss"] = HTTP.xss; // An array of suspicious HTTP request fragments
  }

  // Convert the JSON object to a string
  var jsonString = JSON.stringify(jsonData);

  // Send the JSON data to the webhook URL using an HTTP POST request
  Remote.HTTP( SENTINELONE_ODS_TARGET ).post({
    path: SENTINELONE_PATH,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    payload: jsonString,
    context: {
      action: CONTEXT,
    },
    enableResponseEvent: true,
  });
} else if (event === "REMOTE_RESPONSE") {
  var rsp = Remote.response,
    rspStatus = rsp.status,
    rspBody = rsp.body,
    rspHeaders = rsp.headers,
    rspTime = rsp.time,
    rspError = rsp.error;

  if (context instanceof Object && context.action === CONTEXT) {
    debug(
      `version: ${version} | statusCode: ${rspStatus} | responseTime: ${rspTime} | responseHeaders: ${rspHeaders} | responseBody: ${rspBody}`
    );
  }
}
