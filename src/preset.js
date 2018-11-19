const parse = require('../packages/vremark-parse');
const vdom = require('../packages/rehype-vdom');

exports.settings = {};

exports.plugins = [
    parse,
    vdom
];
