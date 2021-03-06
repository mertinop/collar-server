var express = require('express');

var app = express();
var server = app.listen(4000, () => { //Start the server, listening on port 4000.
    console.log("Listening to requests on port 4000...");
});

var io = require('socket.io')(server); //Bind socket.io to our express server.

app.use(express.static('public')); //Send index.html page on GET /

io.on('connection', (socket) => {
    console.log("Someone connected. ", socket.id); //show a log as a new client connects.
    //console.log(socket);

      //mensaje recibido del collar
    socket.on('MSJ', function(msg){
        var d = new Date();
        io.sockets.emit('Temperatura', {
            x: d,
            y: Math.floor(msg.TEMP),
        });
        io.sockets.emit('Pulso', {
            x: d,
            y: msg.PULSO,
        });
    });
});
