/**
 * Module Dependencies
 */

var assert = require('assert');
var Duo = require('duo');
var myth = require('..');
var path = require('path');
var read = require('fs').readFileSync;

var fixture = path.join.bind(null, __dirname);

describe('duo-myth', function() {
  it('should compile .css', function*() {
    var expected = read(fixture('simple/build.css'), 'utf8');
    var css = yield build('simple').run();
    assert.equal(css.code.trim(), expected.trim());
  });

  it('should compile .css using imports', function*() {
    var expected = read(fixture('import/build.css'), 'utf8');
    var css = yield build('import').run();
    assert.equal(css.code.trim(), expected.trim());
  });

  it('should process the entire build', function*() {
    var expected = read(fixture('alternate-plugin/build.css'), 'utf8');

    var css = yield build('alternate-plugin').run();
    assert.equal(css.code.trim(), expected.trim());
  });

  it('should pass options through', function*() {
    var expected = read(fixture('compress/build.css'), 'utf8');
    var css = yield build('compress', { compress: true }).run();
    assert.equal(css.code.trim(), expected.trim());
  });

  describe.only('with caching enabled', function() {
    afterEach(function *() {
      yield build('simple').cache(true).cleanCache();
    });

    it('should be significantly faster', function*() {
      var duo = build('simple', { compress: true }).cache(true);

      var timer1 = timer();
      yield duo.run();
      var noCache = timer1();

      var timer2 = timer();
      yield duo.run();
      var withCache = timer2();

      console.log('with cache: %d -- no cache: %d', withCache, noCache);
      assert(withCache < noCache / 2);
    });
  });
});

/**
 * Helper for creating a Duo builder instance.
 *
 * @param {String} entry      The fixture entry file to use
 * @param {Object} [options]  Additional config
 * @return {Duo}
 */

function build(entry, options) {
  return new Duo(__dirname)
    .cache(false)
    .use(myth(options))
    .entry(fixture(entry, 'index.css'));
}

/**
 * Create a timer. The function returned should be called
 * later and it will return the number of ms since it was
 * created.
 *
 * @returns {Function}
 */

function timer() {
  var now = (new Date()).getTime();
  return function () {
    return (new Date()).getTime() - now;
  };
}
