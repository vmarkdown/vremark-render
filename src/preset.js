const vdom = require('../packages/rehype-vdom');

exports.settings = {};

exports.plugins = [
    function () {
        this.Parser = function (doc, file) {
            return file.hast;
        };
    },

    vdom
];
