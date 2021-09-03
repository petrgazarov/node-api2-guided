const express = require('express');

//
// Dividing our API app up into different "router" files allows us to keep it
// organized, in light of the fact that we will likely end up with dozens, if
// not hundreds (or in some cases, thousands!) of endpoints. In our small
// example here, we only have a few, but we demonstrate how to create separate
// "router" objects and modules to allow us to keep all of the code for different
// parts of our API organized and easy to evolve.
//
// The main express() "application" has a "router" built into it. So when we
// call "server.get('/api/adopters', (req, res) => {...})", we are adding a GET
// /api/adopters "route handler" to the server's default router object.
//
// In ExpressJS, we can create *additional* routers, and *bind* them to specific
// "root URL's". ExpressJS will route requests that are addressed to the "bound"
// root URL to the corresponding router.
//
// In this server file, we "require" our router modules, which each export an
// express.Router() object. These objects are "bound" to their respective root URLs
// using the use() method.
//
// It makes sense to structure your code after your API endpoints. In our case, we have
// two top-level resources - "dogs" and "adopters". We structure our code with two routers,
// one for each resource.
//
// A Router() object is actually a middleware function, taking the
// same (req, res) parameters that any middleware function does. It also has
// its own middleware stack within it, and will process the request to hand it
// off to the next middleware handler from the Router's stack that matches the
// METHOD and /path.

const adoptersRouter = require('./adopters/adopters-router');
const dogsRouter = require('./dogs/dogs-router');

//
// Here we create our server object, which we will "configure" by adding
// routers, default route handlers, and other middleware to it, and then export
// it (so we can "start" it in index.js with the server.listen() call...)
//
const server = express();

//
// This is the JSON parser middleware. Adding it directly to the express() app
// (a.k.a. "server") makes it "global". It will apply to all HTTP requests,
// regardless of what what router will ultimately handle it. This is because we
// are adding this middleware directly to the express() app, rather than to a
// specific router. If we wanted to have certain middleware apply only to
// requests handled by a specific router, we could call router.use() in the
// router module to add it. But here, we are adding it to the express() app, so
// it is global (applies to ALL HTTP requests).
//
server.use(express.json());

//
// Here, we "bind" our router objects to specific "URL prefixes" (a.k.a. "root
// URL's").
//
// When requests come in, Express() will look in its middleware list for any
// middleware that is bound to a URL prefix that matches the request URL. When a
// Router is bound to a URL prefix that matches the request URL, the request is
// given to the Router. It will then strip the prefix from the request URL, and
// work to match the remainder of the path to any route handlers within the
// Router that match.
//
// So, GET /api/adopters/ will be handled by the GET "/" handler in the adoptersRouter
// object, because the adoptersRouter object is bound to /api/adopters, and /api/adopters
// will be stripped from the request URL (leaving only "/"). Likewise, DELETE
// /api/adopters/:id will cause Express() to route the request to the adoptersRouter,
// which will try to match on DELETE /:id.
//
// The Router determines which middleware handler within the Router to give the
// request to based on the METHOD, and the remainder of the path (the portion of
// the URL that isn't stripped, that comes after the URL prefix to which the
// Router is bound.)
//
server.use('/api/adopters', adoptersRouter); // delegate requests to /api/adopters to the router

//
// Here, we bind our dogsRouter middleware
//
server.use('/api/dogs', dogsRouter); // delegate requests to /api/dogs to the router

//
// This middleware handler is not bound to a URL prefix, because it is added to
// the "default" router in the Express() app (a constant called "server" in our
// instance here.)
//
// Thus, this handler will match "GET /" requests.
//
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Shelter API</h>
    <p>Welcome to the Lambda Shelter API</p>
  `);
});

module.exports = server; // CommonJS way of exporting out of a module
// this is equivalent to: export default server; for ES2015 modules