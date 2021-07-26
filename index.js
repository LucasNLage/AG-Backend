const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 8000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

// Test conmmit


// Runs when websocket connection is established
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Checks if connection closes
    ws.on('close', () => console.log('Client disconnected'));

    // Checks if message is recieved, then forwards the message(move) to other clients
    ws.on('message', (request) => {
        console.log('req:', request);

        // console.log((new Date()) + ' Recieved a new connection from origin ' + request + '.');

        wss.clients.forEach((client) => {
            client.send(request);
        });
    })

});

// 

// setInterval(() => {
//     wss.clients.forEach((client) => {
//         client.send(new Date().toTimeString());
//     });
// }, 10000);