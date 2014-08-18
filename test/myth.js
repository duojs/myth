/**
 * Module Dependencies
 */

var read = require('fs').readFileSync;
var join = require('path').join;
var assert = require('assert');
var myth = require('..');
var Duo = require('duo');

/**
 * Tests
 */

describe('duo-myth', function() {
  it('should compile .css', function(done) {
    var expected = read(join(__dirname, 'build.css'), 'utf8');

    Duo(__dirname)
      .use(myth())
      .entry('index.css')
      .run(function(err, css) {
        if (err) return done(err);
        assert(css == expected.trim());
        done();
      });
  })

  it('should pass options through', function(done) {
    Duo(__dirname)
      .use(myth({ compress: true }))
      .src('body {\n\tbackground: blue;\n}')
      .run(function(err, css) {
        if (err) return done(err);
        assert('body{background:blue;}' == css);
        done();
      });
  })
})
