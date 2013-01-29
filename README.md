backbone-server
===============

Implements an in-memory server for Backbone.js
http://documentcloud.github.com/backbone/#Sync

This project is a teaching aid. It provides an out-of-the-box server that Backbone.js models can sync with.

It uses the [CORS headers](https://developer.mozilla.org/en/http_access_control) to allow cross-origin requests.

Usage
-----

1. Clone the repository

1. Install node.js

1. Install the dependencies with `npm install`

1. Start the server with `node rasterver.js`

1. Configure your models / collections with urls in the form `http://localhost:3002/[collectionname]`

Examples
--------

### Create a new 'people' resource:

```
curl -vX POST [{"name":"X POST http://withouttheloop.com:3002/people -H 'content-type: application/json' -d '{"name":"Liam", "age": 72}'
```

< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type
< Content-Type: application/json; charset=utf-8
< Content-Length: 8
< Date: Tue, 29 Jan 2013 07:19:00 GMT
< Connection: keep-alive
< 
* Connection #0 to host withouttheloop.com left intact
* Closing connection #0
{"id":1}




P.S.
----

For truly zero-config usage I run a hosted instance of backbone-server at http://withouttheloop.com:3002. Set your model's url to `http://withouttheloop.com:3002/[some unique collection id]` and it will work magically. I do occassionally restart the service so not recommended for production. ;)

