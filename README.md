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

1. Configure your models / collections with urls in the form `http://localhost:3000/[collectionname]`