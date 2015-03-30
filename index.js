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
  alternate: false,
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

  // this plugin only works on the entire build
  myth.alternate = true;
  return myth;

  function myth(build, entry) {
    if (entry.type !== 'css') return;

    var options = defaults(opts, { source: entry.path });
    build.code = compile(build.code, options);
  }
}
