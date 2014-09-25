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
    var expected = read(join(__dirname, 'fixtures/features.css'), 'utf8');

    Duo(__dirname)
      .use(myth())
      .entry('features.css')
      .run(function(err, css) {
        if (err) return done(err);
        assert(css == expected.trim());
        done();
      });
  })

  it('should pass options through', function(done) {
    Duo(__dirname)
      .use(myth({ compress: true }))
      .entry('body {\n\tbackground: blue;\n}', 'css')
      .run(function(err, css) {
        if (err) return done(err);
        assert('body{background:blue;}' == css);
        done();
      });
  })

  it('should support var-usage using imports', function(done) {
    var expected = read(join(__dirname, 'fixtures/imports.css'), 'utf8');

    Duo(__dirname)
      .use(myth())
      .entry('imports.css')
      .run(function(err, css) {
        if (err) return done(err);
        assert(css == expected.trim());
        done();
      });
  })
})
