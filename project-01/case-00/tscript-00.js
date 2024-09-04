// Define the webhook URL where the JSON data will be sent
const webhookUrl = '';
const authToken  = '';
let date = new Date()

// Check if the event is HTTP_REQUEST to capture transaction data
if (HTTP || HTTPS) {
    // Create a JSON object with all relevant transaction data fields
    var jsonData = {
        "timestamp": date.toISOString(),        // Transaction timestamp in ISO format
        "message": "Hello Work!"                // Hello Work! 
    };

    // Convert the JSON object to a string
    var jsonString = JSON.stringify(jsonData);

    // Send the JSON data to the webhook URL using an HTTP POST request
    Remote.HTTP(webhookUrl)
        .method('POST')
        .header('Content-Type', 'application/json')
        .header('Authorization', 'Bearer ' + authToken)  // Include the token in the header
        .body(jsonString)
        .send();
}
