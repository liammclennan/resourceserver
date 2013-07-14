// Implements an in-memory resource server

var express = require('express'),
    app = express(),
    persist = require('./persist'),
    port = 3002,
    _ = require('underscore'),
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

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}