// Implements an in-memory server for Backbone.js
// http://documentcloud.github.com/backbone/#Sync

var express = require('express'),
    app = express(),
    idCounter = 0,
    data = {},
    port = 3002,
    _ = require('underscore');

app.configure(function () {
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

app.options("*", function (req, res) {
	res.header('Allow', 'OPTIONS,GET,PUT,POST,DELETE');
	res.send();
});

app.get("/:collection", function(req, res) {
    console.log('read ' + req.params.collection);
    if (!data[req.params.collection]) {
        return res.send(404);
    }

    data[req.params.collection] = data[req.params.collection] || [];
    res.send(data[req.params.collection]);
});

// create -> POST /collection
app.post('/:collection', function(req, res){
    console.log('create ' + req.params.collection);
    console.log(req.body);
    req.body.id = idCounter++;
    data[req.params.collection] = data[req.params.collection] || [];
    data[req.params.collection].push(req.body);
    res.send({ id: req.body.id });
});

// read -> GET /collection[/id]
app.get('/:collection/:id?', function (req,res) {
    console.log('read ' + (req.params.id || ('collection ' + req.params.collection)));

    if (data[req.params.collection] && !req.params.id) {
        return res.send(data[req.params.collection]);
    }

    var model = findModel(req.params.collection, req.params.id);
    if (!model && req.params.id) {
        return res.send('cant find model ' + req.params.id, 404);
    }
    res.send(model);
});

// update -> PUT /collection/id
app.put('/:collection/:id', function (req,res) {
    console.log('update ' + req.params.collection + ' - ' + req.params.id);
    removeModel(req.params.collection, req.params.id);
    data[req.params.collection].push(req.body);
    res.send(200);
});

// delete -> DELETE /collection/id
app.delete('/:collection/:id', function (req,res) {
    console.log('delete ' + req.params.collection + ' - ' + req.params.id);
    removeModel(req.params.collection, req.params.id);
    res.send(200);
});

app.listen(port);
console.log('Backbone-server started at port %d.', port);

function removeModel(collection, id) {
    if (!data[collection]) {
        console.log('cant find collection ' + collection);
        return;
    }
    data[collection] = _(data[collection]).reject(function (model) {
        return model.id === parseInt(id, 10);
    });
}

function findModel(collection, id) {
    if (!data[collection]) {
        console.log('cant find collection ' + collection);
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