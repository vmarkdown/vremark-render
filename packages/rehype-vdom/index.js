'use strict'

var xtend = require('xtend');
var toVDom = require('../hast-util-to-vdom');

module.exports = function plugin(options = {}) {
    var settings = xtend(options, this.data('settings'));

    this.Compiler = compiler;

    function compiler(tree) {
        return toVDom(tree, settings)
    }
};
