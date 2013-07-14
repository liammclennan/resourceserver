curl -vX POST http://localhost:3002/people -H 'content-type: application/json' -d '{"name": "Liam", "age": 29}'
curl -vX POST http://localhost:3002/people -H 'content-type: application/json' -d '{"name": "Noah", "age": 1}'
curl -v http://localhost:3002/people
curl -v http://localhost:3002/people/1
curl -vX PUT http://localhost:3002/people/1 -H 'content-type: application/json' -d '{"name": "LiamO", "age": 30}'
curl -v http://localhost:3002/people/1
curl -vX DELETE http://localhost:3002/people/1
curl -v http://localhost:3002/people