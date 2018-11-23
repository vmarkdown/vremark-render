var xtend = require('xtend');
const visit = require('unist-util-visit');
const PLUGIN_NAME = 'vremark-plugin-flowchart';
const COMPONENT_NAME = 'vremark-component-flowchart';

function isPlugin(node) {
    return node.lang &&
        (
            node.lang === 'flow' || node.lang === 'flowchart'
        )
        && node.tagName === "pre" && node.type === "element";
}

function plugin(options = {}) {
    var settings = xtend(options, this.data('settings'));

    // const Vue = settings.Vue;
    const register = settings.register;

    let hasComponent = false;

    return async function transformer(root, file, next) {

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

            hasComponent = true;

        });


        if(!hasComponent ){
            next();
            return root;
        }

        const component = await import(
            /* webpackChunkName: "vremark-component-flowchart" */
            './component');

        if(register){
            register(component.default || component);
        }

        next();

    };

}

module.exports = plugin;