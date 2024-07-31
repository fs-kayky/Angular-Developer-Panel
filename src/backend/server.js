const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {

  ws.id = uuid.v4();

  ws.send(JSON.stringify({ type: 'id', id: ws.id }));
  console.log('Client connected with id: ', ws.id);

  ws.on('message', (message) => {
    console.log('Received message: ', message);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
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
