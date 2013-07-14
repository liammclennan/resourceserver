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
      withId = _.extend(resource, {id: nextId})
      client.hset build_key(collectionName), nextId, JSON.stringify withId
      withId    

  all: (collectionName) ->
    client.hvals(build_key(collectionName)).then (set) ->
      (for el in set
        JSON.parse el)

  get: (collectionName, id) ->
    client.hget(build_key(collectionName), id).then((el) ->
      JSON.parse el
    )

  update: (collectionName, id, resource) ->
    _.extend(resource, {id: id})
    client.hset(build_key(collectionName), id, JSON.stringify resource)
    resource

  delete: (collectionName, id) ->
    client.hdel build_key(collectionName), id

build_key = (collectionName) ->
  "resource:#{collectionName}"