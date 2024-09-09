// s1_ODS_target is configured as a target for an Open Data Stream
const s1_path = "/services/collector/raw?sourcetype=extrahop"
const date = new Date();

// Check if the event is HTTP_REQUEST or HTTP_RESPONSE to capture transaction data

if (HTTP) {
    // Create a JSON object with all relevant transaction data fields
    var jsonData = {
        "timestamp": date.toISOString(),                        // Transaction timestamp in ISO format
        "protocol": HTTP.encryptionProtocol,                    // Determine the protocol
        "client_ip": HTTP.origin.toString(),                    // Client IP address
        "server_ip": HTTP.host.toString(),                      // Server IP address
        "method": HTTP.method,                                  // HTTP method (GET, POST, etc.)
        "uri": HTTP.uri,                                        // URI accessed
        "request_headers": HTTP.findHeaders("Request"),         // HTTP request headers
        "response_headers": HTTP.findHeaders("Response"),       // HTTP response headers
        "user_agent": HTTP.userAgent,                           // User agent string
        "content_type": HTTP.findHeaders("Content-"),           // Response content type
        "referrer": HTTP.referer,                               // Referer if specified
    };

    // HTTP.statusCode is not valid on HTTP_REQUEST
    if (HTTP.statusCode) {
        jsonData["response_code"] = HTTP.statusCode;            // HTTP response code
    }

    // HTTP.roundTripTime is not valid on HTTP_REQUEST
    if (HTTP.roundTripTime) {
        jsonData["duration"] = HTTP.roundTripTime;              // Transaction duration
    }

    // XSS may not exist on all HTTP_REQUEST records
    if (HTTP.xss) {
        jsonData["xss"] = HTTP.xss;                             // An array of suspicious HTTP request fragments
    }

    // Convert the JSON object to a string
    var jsonString = JSON.stringify(jsonData);

     // Send the JSON data to the webhook URL using an HTTP POST request
     try {
        Remote.HTTP('s1_ODS_target').post({
            'path': s1_path,
            'payload': jsonString
        });
    } catch (e) {
        // Log the error to the ExtraHop debug log
        debug(e);
    }
}