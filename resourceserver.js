// Implements an in-memory server for Backbone.js
// http://documentcloud.github.com/backbone/#Sync

var express = require('express'),
    app = express(),
    idCounter = 1,
    data = {},
    persist = require('./persist'),
    port = 3002,
    _ = require('underscore'),
    redisclient = require('then-redis'),
    coffee = require('coffee-script'),
    log = require('./logger')
    ;

app.configure(function () {
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

app.get("/:collection", function(req, res) {
    log.info('read ' + req.params.collection);
    res.send(persist.all(req.params.collection));
});

// create -> POST /collection
app.post('/:collection', function(req, res){
    log.info('create ' + req.params.collection + '\n' + req.body);

    var withId = persist.insert(req.params.collection, req.body);
    res.send(withId);
});

// read -> GET /collection[/id]
app.get('/:collection/:id?', function (req,res) {
    log.info('read ' + (req.params.id || ('collection ' + req.params.collection)));

    res.send(persist.get(req.params.collection, req.params.id));
});

// update -> PUT /collection/id
app.put('/:collection/:id', function (req,res) {
    persist.update(req.params.collection, req.params.id, req.body);
    res.send(persist.get(req.params.collection, req.params.id));
});

// delete -> DELETE /collection/id
app.delete('/:collection/:id', function (req,res) {
    log.info('delete ' + req.params.collection + ' - ' + req.params.id);
    persist.delete(req.params.collection, req.params.id);
    res.send(200);
});

app.listen(port);
log.info('Backbone-server started at port %d.', port);

function removeModel(collection, id) {
    if (!data[collection]) {
        log.info('cant find collection ' + collection);
        return;
    }
    data[collection] = _(data[collection]).reject(function (model) {
        return model.id === parseInt(id, 10);
    });
}

function findModel(collection, id) {
    if (!data[collection]) {
        log.info('cant find collection ' + collection);
        return;
    }
    return _(data[collection]).find(function (m) {
        return m.id === parseInt(id, 10);
    });
}

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}