var assert = require('assert')
  , data = require('../persist')

describe('data', function () {

  describe('insert errors', function() {
    
    describe('insert null resource', function () {
      it('should error', function() {
        assert.throws(function () {
          data.insert('', null);
        });
      });
    });

    describe('insert empty resource', function () {
      it('should be fine', function() {
        data.insert('foos', {});
      });
    });

    describe('insert missing collection name', function () {
      describe('empty string', function () {
        it('should error', function() {
          assert.throws(function () {
            data.insert('', {a: 1});
          });
        });  
      });
      describe('null', function () {
        it('should error', function() {
          assert.throws(function () {
            data.insert(null, {a: 1});
          });
        });  
      });
      describe('undefined', function () {
        it('should error', function() {
          assert.throws(function () {
            data.insert(undefined, {a: 1});
          });
        });  
      });
    });
    
  });

  describe('a collection with multiple resources', function () {
    var collectionName = 'acollectionwithmultipleresources',
      firstId, secondId;
    before(function () {
      firstId = data.insert(collectionName, {a: 1, b: 'sdfs'});
      secondId = data.insert(collectionName, {a: 6, b: 'somfsfsaf'});
    });

    describe('all', function () {
      it('should give all resources', function(done) {
        data.all(collectionName).then(function (c) {
          assert.equal(c.length, 2);  
        }).then(function () {
          done();
        }, function (e) {
          done(e);
        });        
      });
      it('they should have non-identical ids', function (done) {
        var resources = data.all(collectionName);
        resources.then(function (c) {
          assert(c[0].id != c[1].id);  
        }).then(function () {
          done();
        }, function (e) {
          done(e);
        });        
      })
    });

    describe('update 1', function () {
      var p;
      before(function (done) {
        p = data.update(collectionName, 1, {
          a: 1, b: 'updated'
        });
        p.then(function() {
          done();
        });
      });
      it('should have updated 1', function (done) {
        var r = data.get(collectionName, 1);
        r.then(function (el) {
          assert.equal('updated', el.b);          
        }).then(function () {
          done();
        }, function (e) {
          done(e);
        })
      });
    });

    describe('delete 1', function () {
      before(function () {
        data.delete(collectionName, 1);
      });
      it('should have deleted 1', function () {
        assert.throws(function () {
          data.get(collectionName,1);
        });
      });
        
    
    });
      
  
  });

  // describe('')

});