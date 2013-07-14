assert = require 'assert'
redis = require '../redispersist'

describe 'redispersist', ->
  
  it 'should insert', (done) ->
    p = redis.insert('foos', {
      a: 1
    })
    handle_promise p, done

  it 'should query all', (done) ->
    p = redis.all('foos').then((set) ->
      assert(set.length > 0)
      assert.equal set.pop().a, 1 
    )
    handle_promise p, done

  it 'should query single', (done) ->
    p = redis.insert('insertsingle', {
      b: 12
    })
    p.then (id) ->
      redis.get('insertsingle', id).then((el) ->
        assert el 
        assert el.id
        assert el.b, 12
        console.dir el
        assert.fail('gaahhh')
      )
    handle_promise p, done



handle_promise = (p, d) ->
  p.then((success) ->
    d()
  , (e) ->
    d e
  ) 