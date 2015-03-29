/**
 * Module Dependencies
 */

var compile = require('myth');
var defaults = require('defaults');

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
 * Myth plugin
 *
 * @param {Object} o
 * @return {String}
 */

function plugin(o) {
  var opts = defaults(o, plugin.defaults);

  return function myth(file) {
    if ('css' != file.type) return;
    var options = defaults(opts, { source: file.path });
    file.src = compile(file.src, options);
  }
}
