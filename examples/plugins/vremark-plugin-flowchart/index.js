const visit = require('unist-util-visit');
const PLUGIN_NAME = 'vremark-plugin-flowchart';
const COMPONENT_NAME = 'vremark-component-flowchart';


const Vue = require('vue').default;


Vue.component(COMPONENT_NAME, require('./component'));


function isPlugin(node) {
    return node.lang &&
        (
            node.lang === 'flow' || node.lang === 'flowchart'
        )
        && node.tagName === "pre" && node.type === "element";
}

function plugin(options = {}) {


    return function transformer(root) {

        visit(root, function (node) {
            return isPlugin(node);
        }, function (node) {

            const data = node.data || {};

            Object.assign(data, {
                props: {
                    code: node.value
                }
            });

            node.tagName = COMPONENT_NAME;

            node.children = [];

        })


    };

}

module.exports = plugin;