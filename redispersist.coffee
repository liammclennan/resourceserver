dbc = require 'dbc'
_ = require 'underscore'
redis = require 'then-redis'
config = require './config'
client = redis.createClient config.redis_config
log = require './logger'
max_results = 100000

module.exports = 

  insert: (collectionName, resource) ->
    client.incr('resource:id').then (nextId) ->
      client.rpush(build_key(collectionName,nextId), JSON.stringify _.extend(resource, {id: nextId}))
      build_key(collectionName,nextId)
    

  all: (collectionName) ->
    client.lrange("resource:#{collectionName}", 0, max_results).then (set) ->
      (for el in set
        JSON.parse el)

  get: (collectionName, id) ->

  update: (collectionName, id, resource) ->

  delete: (collectionName, id) ->

build_key = (collectionName, id) ->
  "resource:#{collectionName}"