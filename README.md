Resourceserver
===============

Implements an in-memory resource oriented HTTP server, provding 5 basic operations (shown in curl_tests.sh):

### POST /:collection

Create a new resource.

```
curl -vX POST http://localhost:3002/people -H 'content-type: application/json' -d '{"name": "Liam", "age": 29}'
```

```
{
  "name": "Liam",
  "age": 29,
  "id": 2
}
```

```
curl -vX POST http://localhost:3002/people -H 'content-type: application/json' -d '{"name": "Noah", "age": 1}'
```

```
{
  "name": "Noah",
  "age": 1,
  "id": 2
}
```

### GET /:collection/:id

Retrieve the `:collection` resource with id `:id`.

```
curl -v http://localhost:3002/people/1
```

```
{
  "name": "Liam",
  "age": 29,
  "id": 1
}
```

### GET /:collection

Retrieve an array of all `:collection` resources.

```
curl -v http://localhost:3002/people
```

```
[
  {
    "name": "Liam",
    "age": 29,
    "id": 1
  },
  {
    "name": "Noah",
    "age": 1,
    "id": 2
  }
]
```

### PUT /:collection/:id

Override the `:collection` resource with id `:id`.

```
curl -vX PUT http://localhost:3002/people/1 -H 'content-type: application/json' -d '{"name": "LiamO", "age": 30}'
```

```
{
  "name": "LiamO",
  "age": 30,
  "id": "1"
}
```

### DELETE /:collection/:id

Delete the `:collection` resource with id `:id`.

```
curl -vX DELETE http://localhost:3002/people/1
```

It uses the [CORS headers](https://developer.mozilla.org/en/http_access_control) to allow cross-origin requests.

Usage
-----

1. Clone the repository

1. Install node.js

1. Install the dependencies with `npm install`

1. Start the server with `npm start`

1. `cd test && ./curl_tests.sh`
