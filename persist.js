var data = {}
  , dbc = require('dbc')
  , _ = require('underscore')

module.exports = {

  insert: function (collectionName, resource) {
    dbc.assertIsObject(resource, "resource is not an object");
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    var withId = _.extend(resource, {id: nextId(c)});
    c.push(withId);
    return withId;
  },

  all: function (collectionName) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    return c;
  },

  get: function (collectionName, id) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    var resource = _.find(c, function (r) {
      return r.id == id;
    });
    dbc.assert(resource && (typeof resource) === 'object');
    return resource;
  },

  update: function (collectionName, id, resource) {
    validateCollectionName(collectionName);
    var c = getCollection(collectionName);
    data[collectionName] = _.reject(c, function (x) {
      return x.id == id;
    });
    data[collectionName].push(_.extend(resource, {id: id}));
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