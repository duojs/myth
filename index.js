/**
 * Module Dependencies
 */

var debug = require('debug')('duo-myth');
var extend = require('extend');
var myth = require('myth');

/**
 * Export `plugin`
 */

module.exports = plugin;

/**
 * Default options.
 */

plugin.defaults = {
  features: {
    import: false
  }
};

/**
 * Myth plugin.
 *
 * @param {Object} o
 * @return {String}
 */

function plugin(o) {
  var opts = extend(true, {}, plugin.defaults, o);

  // this plugin only works on the entire build
  myth.alternate = true;
  return myth;

  function *myth(build, entry, duo) {
    if (entry.type !== 'css') return;

    debug('processing build for %s', entry.id);
    build.code = yield run(build.code, entry, duo, opts);
  }
}

/**
 * Runs the majority of the logic for the plugin, including
 * the compilation and managing the cache.
 *
 * @param {Object} build
 * @param {File} entry
 * @param {Duo} duo
 * @param {Object} options
 * @return {String}
 */

function *run(code, entry, duo, options) {
  var cache = yield duo.getCache();
  if (!cache) {
    debug('cache not enabled for %s', entry.id);
    return compile(code, entry, options);
  }

  var key = [ duo.hash(code), duo.hash(options) ];
  var cached = yield cache.plugin('myth', key);
  if (cached) {
    debug('retrieved %s from cache', entry.id);
    return cached;
  }

  var results = compile(code, entry, options);
  yield cache.plugin('myth', key, results);
  debug('saved %s to cache', entry.id);
  return results;
}

/**
 * Perform the actual compilation given all the context.
 *
 * @param {String) code
 * @param {File} entry
 * @param {Object} options
 * @return {String}
 */

function compile(code, entry, options) {
  var o = extend(true, { source: entry.path }, options);
  return myth(code, o);
}
