const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const PORT = 3001;
const SOCKET_PORT = 3000;
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${SOCKET_PORT}`,
    methods: ['GET', 'POST'],
  }
});

app.use(cors());

const POSTS = require('./posts');

io.on('connection', (socket) => {
  socket.emit('initialPosts', POSTS);

  socket.on('insertPost', (newPost) => {
    POSTS.push(newPost);
    
    io.emit('updatePosts', POSTS);
  });

});

app.get('/', (_req, res) => res.send('Hello World!'));
httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
