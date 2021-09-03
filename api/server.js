// BREAK UP THIS MONOLITHIC FILE USING ROUTES
// BREAK UP THIS MONOLITHIC FILE USING ROUTES
// BREAK UP THIS MONOLITHIC FILE USING ROUTES
const express = require('express');
const dogsRouter = require('./dogs/dogs-router');
const adoptersRouter = require('./adopters/adopters-router');

const server = express();

server.use(express.json());

server.use('/api/dogs', dogsRouter);
server.use('/api/adopters', adoptersRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Shelter API</h>
    <p>Welcome to the Lambda Shelter API</p>
  `);
});

module.exports = server;
