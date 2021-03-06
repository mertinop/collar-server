var express = require('express');

var app = express();
var array = [];
var i;
var server = app.listen(4000, () => { //Start the server, listening on port 4000.
    console.log("Listening to requests on port 4000...");
});

var io = require('socket.io')(server); //Bind socket.io to our express server.

app.use(express.static('public')); //Send index.html page on GET /

io.on('connection', (socket) => {
    console.log("Someone connected. ", socket.id); //show a log as a new client connects.
    //console.log(socket);

    array[i]=socket.id;
    i++;

    rooms = Object.keys(socket.rooms);

    //mensaje recibido del collar
    socket.on('MSJ', function(msg){
        socket.join(msg.ID);
        console.log(msg.ID);
        var d = new Date();
        io.to(msg.ID).emit('Temperatura', {
            x: d,
            y:  Math.floor(msg.TEMP),
            });

        io.to(msg.ID).emit('Pulso', {
            x: d,
            y: msg.PULSO,
        });
        rooms = Object.keys(socket.rooms);
        // rooms.forEach(element => {
        //     socket.leave(element);
        // });

    });

    //Cuando se conecte un collar a room
    socket.on('room', function (room) {
        console.log(rooms);
        socket.join(room);
    });
    socket.on('salir', function(room){
        socket.leave(room);
    });

    /*socket.on('Temperatura', function(msg){
        var d = new Date();
        io.sockets.emit('Temperatura', {
            x: d,
            y: msg,
        });
    });
    socket.on('Pulso', function(msg){
        var d = new Date();
        io.sockets.emit('Pulso', {
            x: d,
            y: msg,
        });
    });*/
});
