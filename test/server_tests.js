var assert = require('assert')
  , request = require('request')
  , rootUrl = 'http://localhost:3002/'
  , spawn = require('child_process').spawn
  , rs = {}

describe('resourceserver', function () {

  before(function (done) {
    // start resource server
    rs = spawn('node', ['../resourceserver.js'], {cwd: __dirname});
    setTimeout(function () {
      done();
    }, 500);
  });

  after(function () {
    // console.log(rs);
    rs.kill();
  });

  describe('insert', function () {
    it('should create a resource', function (done) {
      var resourceUrl = rootUrl + 'vehicle'
        , vehicle = {
        type: 'car'
      };
      request.post({url: resourceUrl, json:vehicle}, function (e, r, body) {
        if (e) assert.fail('error posting');
          request.get({url: resourceUrl}, function (e2,r2,body2) {
            if (e2) assert.fail('error getting');
            assert.equal(1, JSON.parse(body2).length);
            done();
        });  
      });
    });
  });

  describe('reading', function () {
    it('should get a collection', function (done) {
      request(rootUrl + 'vehicle', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          assert.equal(1, JSON.parse(body).length);
        } else {
          assert.fail('failed retrieving collection');
        }
        done();
      });
    });      
  });

  // describe('update', function () {
  //     var id = 0; 
  //     var update = {
  //       id: 0, type: 'bicycle'
  //     };

  //     it('should update', function (done) {
  //       request.post({
  //         url: rootUrl + 'vehicle/1', 
  //         json: update
  //       }, function (error, r, b) {
  //         if (error) {
  //           assert.fail('failed to update');
  //           done();
  //           return;
  //         }
  //         request(rootUrl + 'vehicle/1', function (e, response, body) {
  //           if (e) {
  //             assert.fail('failed to read update');
  //             done();
  //             return;
  //           }
  //           console.log(body);
  //           var data = JSON.parse(body);
  //           assert.equal('bicycle', data.type);
  //           done();
  //         });
  //       });
  //     });
  
  // });

  
    



});