var data = {}
  , dbc = require('dbc')
  , _ = require('underscore')
  , q = require('q')

function wrap(v) {
  return q.fcall(function () {return v;});
}

module.exports = {

  insert: function (collectionName, resource) {
    dbc.isObject(resource, "resource is not an object");
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    var withId = _.extend(resource, {id: nextId(c)});
    c.push(withId);
    return wrap(withId);
  },

  all: function (collectionName) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    return wrap(c);
  },

  get: function (collectionName, id) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    var resource = _.find(c, function (r) {
      return r.id == id;
    });
    dbc.assert(resource && (typeof resource) === 'object');
    return wrap(resource);
  },

  update: function (collectionName, id, resource) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    data[collectionName] = _.reject(c, function (x) {
      return x.id == id;
    });
    var updated = _.extend(resource, {id: id});
    data[collectionName].push(updated);
    return wrap(updated);
  },

  delete: function (collectionName, id) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    data[collectionName] = _.reject(c, function (x) {
      return x.id == id;
    });
  }

};

function validateCollectionName(collectionName) {
  dbc.assert(collectionName && (typeof collectionName) === 'string' && collectionName.length > 0, 
    'collectionName is invalid');
}

function nextId(collection) {
  if (collection.length === 0) return 1;
  return _.max(collection, function(resource) {
    return resource.id;
  }).id + 1;
}

function getCollection(name) {
  data[name] = data[name] || [];
  return data[name];
}