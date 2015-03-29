/**
 * Module Dependencies
 */

var read = require('fs').readFileSync;
var join = require('path').join;
var fixture = join.bind(null, __dirname);
var assert = require('assert');
var myth = require('..');
var Duo = require('duo');

/**
 * Tests
 */

describe('duo-myth', function() {
  it('should compile .css', function(done) {
    var expected = read(fixture('simple/build.css'), 'utf8');

    Duo(__dirname)
      .use(myth())
      .entry(fixture('simple/index.css'))
      .run(function(err, css) {
        if (err) return done(err);
        assert.equal(css.trim(), expected.trim());
        done();
      });
  })

  it('should compile .css using imports', function(done) {
    var expected = read(fixture('import/build.css'), 'utf8');

    Duo(__dirname)
      .use(myth())
      .entry(fixture('import/index.css'))
      .run(function(err, css) {
        if (err) return done(err);
        assert.equal(css.trim(), expected.trim());
        done();
      });
  })

  it('should pass options through', function(done) {
    Duo(__dirname)
      .use(myth({ compress: true }))
      .entry('body {\n\tbackground: blue;\n}', 'css')
      .run(function(err, css) {
        if (err) return done(err);
        assert.equal('body{background:blue;}', css);
        done();
      });
  })
})
