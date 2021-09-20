import http from 'http';

export default (http: http.Server) => {
    const io = require('socket.io')(http, {
        cors: {
            origin:  "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket: any) => {
        console.log("CONNECTED");
    })

    return io;
}