/**
 * Module Dependencies
 */

var compile = require('myth');

/**
 * Export `plugin`
 */

module.exports = plugin;

/**
 * Myth plugin
 *
 * @param {Object} opts
 * @return {String}
 */

function plugin(opts) {
  opts = opts || {};
  opts.features = opts.features || {};

  // only disable import, if not explictly
  // set to true
  if (opts.features.import !== true) {
    opts.features.import = false;
  }

  return function myth(file) {
    if ('css' != file.type) return;
    opts.source = file.path;
    file.src = compile(file.src, opts);
  }
}
