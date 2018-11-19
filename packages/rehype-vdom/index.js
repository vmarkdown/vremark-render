'use strict'

var xtend = require('xtend');
var toVDom = require('../hast-util-to-vdom');

// module.exports = VDom;
//
// function VDom(config) {
//     var settings = xtend(config, this.data('settings'));
//     return toVDom(tree, settings)
//     // this.Compiler = compiler;
//     //
//     // function compiler(tree) {
//     //     return toVDom(tree, settings)
//     // }
// }


module.exports = function plugin(options = {}) {
    var settings = xtend(options, this.data('settings'));

    this.Compiler = compiler;

    function compiler(tree) {
        return toVDom(tree, settings)
    }

    // return function transformer(root) {
    //     return toVDom(root, settings)
    // };
};
