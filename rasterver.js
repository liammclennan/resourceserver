// Implements an in-memory server for Backbone.js
// http://documentcloud.github.com/backbone/#Sync

var express = require('express'), 
	app = express.createServer(express.bodyParser()), 
	idCounter = 0, 
	data = {},
	_ = require('underscore');

// create -> POST /collection
app.post('/:collection', function(req, res){
  console.log('create ' + req.params.collection);
  req.body.id = idCounter++;
  data[req.params.collection] = data[req.params.collection] || [];
  data[req.params.collection].push(req.body);
  res.send({ id: req.body.id });
});

// read -> GET /collection[/id]
app.get('/:collection/:id?', function (req,res) {
	console.log('read ' + (req.params.id || ('collection ' + req.params.collection)));

	if (data[req.params.collection] && !req.params.id) {
		res.send(data[req.params.collection]);
		return;
	}

	var model = findModel(req.params.collection, req.params.id);
	if (!model) {
		res.send('cant find model ' + req.params.id, 404);
		return;	
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

app.listen(3000);

function removeModel(collection, id) {
	if (!data[collection]) {
		console.log('cant find collection ' + collection);
		return;
	}
	data[collection] = _(data[collection]).reject(function (model) {
		return model.id === parseInt(id);
	});
}

function findModel(collection, id) {
	if (!data[collection]) {
		console.log('cant find collection ' + collection);
		return;
	}
	return _(data[collection]).find(function (m) {
		return m.id === parseInt(id);
	});
}