// s1_ODS_target is configured as a target for an Open Data Stream
const s1_path = "/services/collector/raw?sourcetype=extrahop"

// Define the webhook URL where the JSON data will be sent
let date = new Date();

// Check if the event is HTTP_REQUEST to capture transaction data
if (HTTP) {
    // Create a JSON object with all relevant transaction data fields
    var jsonData = {
        // "timestamp": date.toISOString(),        // Transaction timestamp in ISO format
        "message": "Hello Work!"                // Hello Work! 
    };

    // Convert the JSON object to a string
    var jsonString = JSON.stringify(jsonData);

    // Send the JSON data to the webhook URL using an HTTP POST request
    Remote.HTTP("s1_ODS_target").post({
        path: s1_path,
        payload: jsonString
    });

}