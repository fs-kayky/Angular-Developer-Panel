const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.id = uuid.v4();
  ws.on('message', (message) => {
    console.log('Received message: ', message);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log('Sending message: ', message, ' to client.id: ', ws.id);
        client.send(message, ws.id);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
