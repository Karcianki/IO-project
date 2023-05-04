var game_id = document.getElementById("game_board").getAttribute("game_id");

var connectionString = 'wss://' + window.location.host + '/ws/play/' + game_id + '/';
console.log(connectionString);
var gameSocket = new WebSocket(connectionString);

// Main function which handles the connection
// of websocket.
function connect() {
    console.log("connect");
    gameSocket.onopen = function open() {
        console.log('WebSockets connection created.');
        // on websocket open, send the START event.
        gameSocket.send(JSON.stringify({
            "event": "JOIN",
            "message": ""
        }));
    };

    gameSocket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };
    // Sending the info about the room
    gameSocket.onmessage = function (e) {
        // On getting the message from the server
        // Do the appropriate steps on each event.
        let data = JSON.parse(e.data);
        data = data["payload"];
        let message = data['message'];
        let event = data["event"];
        switch (event) {
            case "JOIN":
                console.log("JOIN");
                break;
            default:
                console.log("No event");
        }
    };
    console.log(gameSocket.readyState);
    console.log(WebSocket.OPEN);
    if (gameSocket.readyState == WebSocket.OPEN) {
        console.log("something");
        gameSocket.onopen();
    }
    while ()
}

//call the connect function at the start.
connect();