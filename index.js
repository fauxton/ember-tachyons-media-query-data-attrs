/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tachyons-media-query-data-attrs',

  setupPreprocessorRegistry: function(type, registry) {
    var MediaQueryAttrConverter = require('./media-query-attr-converter');

    registry.add('htmlbars-ast-plugin', {
      name: 'media-query-attr-converter',
      plugin: MediaQueryAttrConverter,
      baseDir: function() { return __dirname; },
      toTree: function(tree) {
        return tree;
      }
    });
  },
};
