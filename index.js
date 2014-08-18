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

  return function myth(file) {
    if ('css' != file.type) return;
    file.src = compile(file.src, opts);
  }
}
