// Implements an in-memory resource server

module.exports = {
    listen: function (port) {

        var coffee = require('coffee-script'),
            express = require('express'),
            app = express(),
            config = require('./config')
            persist = config.use_redis ? require('./redispersist') : require('./persist'),
            port = port || 3002,
            _ = require('underscore'),
            log = require('./logger')
            ;

        app.configure(function () {
            app.use(express.bodyParser());
            app.use(allowCrossDomain);
        });

        app.get("/:collection", function(req, res) {
            log.info('read ' + req.params.collection);

            persist.all(req.params.collection).then(function (c) {
                res.send(c);
            }, function (e) {
                res.send(500, e);
            });
        });

        // create -> POST /collection
        app.post('/:collection', function(req, res){
            log.info('create ' + req.params.collection + '\n' + req.body);

            persist.insert(req.params.collection, req.body).then(function (withId) {
                res.send(withId);
            }, function (e) {
                res.send(500, e);
            });
        });

        // read -> GET /collection[/id]
        app.get('/:collection/:id?', function (req,res) {
            log.info('read ' + (req.params.id || ('collection ' + req.params.collection)));

            persist.get(req.params.collection, req.params.id).then(function (el) {
                res.send(el);
            }, function (e) {
                res.send(500, e);
            });
        });

        // update -> PUT /collection/id
        app.put('/:collection/:id', function (req,res) {
            log.info('update ' + req.params.collection + ':' + req.params.id);

            updated = persist.update(req.params.collection, req.params.id, req.body);
            res.send(updated);
        });

        // delete -> DELETE /collection/id
        app.delete('/:collection/:id', function (req,res) {
            log.info('delete ' + req.params.collection + ':' + req.params.id);

            persist.delete(req.params.collection, req.params.id);
            res.send(200);
        });

        app.listen(port);
        log.info('Resource-server started at port %d.', port);

        app.options("*", function (req, res) {
            res.header('Allow', 'OPTIONS,GET,PUT,POST,DELETE');
            res.send();
        });

        function allowCrossDomain(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');

            next();
        }
    }
}
