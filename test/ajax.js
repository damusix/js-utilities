describe('Ajax functions', function() {

    var assert = chai.assert;
    var path = 'http://localhost:9877/req';
    var ajax = Utilities.ajax;

    it('should make a GET request and accept headers object as second argument', function(done) {


        var req = ajax.get(path);

        req.then(function(res) {

            assert.equal(res.method, 'get');
            assert.equal(res.path, '/req');

            done();

        }).fail(function (err) {

            done(err);
        });
    });

    it('should make a POST request and accept payload object as second argument', function(done) {


        var req = ajax.post(path, { success: 'yes' });

        req.then(function(res) {


            assert.equal(res.method, 'post');
            assert.equal(res.path, '/req');
            assert.equal(typeof res.payload, 'object');
            assert.equal(res.payload.success, 'yes');

            done();

        }).fail(function (err) {

            console.log(err)
            done(err);
        });
    });

    it('should make a PUT request and accept payload object as second argument', function(done) {


        var req = ajax.put(path, { success: 'yes' });

        req.then(function(res) {

            assert.equal(res.method, 'put');
            assert.equal(res.path, '/req');
            assert.equal(typeof res.payload, 'object');
            assert.equal(res.payload.success, 'yes');

            done();

        }).fail(function (err) {

            done(err);
        });
    });

    it('should make a DELETE request and accept payload object as second argument', function(done) {


        var req = ajax.remove(path, { success: 'yes' });

        req.then(function(res) {

            assert.equal(res.method, 'delete');
            assert.equal(res.path, '/req');
            assert.equal(typeof res.payload, 'object');
            assert.equal(res.payload.success, 'yes');

            done();

        }).fail(function (err) {

            done(err);
        });
    });

    it('should extend default ajax options', function(done) {

        var ext = ajax.extend({ payload: { thisWas: 'extended' }});

        assert.equal(ext.method, 'GET');
        assert.equal(ext.type, 'json');
        assert.equal(ext.payload.thisWas, 'extended');

        done();

    });

    it('should rewrap functions in CRUD object', function(done) {

        assert.equal(typeof ajax.crud, 'object');
        assert.equal(ajax.crud.read, ajax.get);
        assert.equal(ajax.crud.create, ajax.post);
        assert.equal(ajax.crud.update, ajax.put);
        assert.equal(ajax.crud.delete, ajax.remove);

        done();

    });
});
