/**
 * Module Dependencies
 */

var compile = require('myth');

/**
 * Export `myth`
 */

module.exports = myth;

/**
 * Myth plugin
 *
 * @param {Object} opts
 * @return {String}
 */

function myth(opts) {
  opts = opts || {};

  return function(file) {
    if ('css' != file.type) return;
    console.log(opts);
    file.src = compile(file.src, opts);
  }
}
