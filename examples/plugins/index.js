const xtend = require('xtend');
// const plugins = require('./plugins');
// const visitChildren = require('unist-util-visit-children');
const visit = require('unist-util-visit');

const components = {};

function plugin(options = {}) {

    const settings = xtend(options, this.data('settings'));
    const plugins = settings.plugins || [];

    const register = settings.register;

    return function transformer(root, file, next) {

        const tasks = [];

        /*
        debugger
        const global_plugins = plugins.filter(function (plugin) {
            return plugin.global;
        });

        (global_plugins.length>0) && visitChildren(function (node) {

            global_plugins.forEach(function (plugin) {

                if(!plugin.test(node)){
                    return;
                }

                plugin.loader(node);

                if(components[plugin.COMPONENT_NAME]) {
                    return;
                }

                if(!components[plugin.COMPONENT_NAME] && plugin.component) {
                    tasks.push(plugin.component());
                }

            });

        })(root);
        */

        visit(root, function (node) {

            plugins.forEach(function (plugin) {
                if(!plugin.test(node)){
                    return;
                }

                plugin.loader(node);

                if(components[plugin.COMPONENT_NAME]) {
                    return;
                }

                if(!components[plugin.COMPONENT_NAME] && plugin.component) {
                    tasks.push(plugin.component());
                }
            });

        });


        if(tasks.length === 0){
            next();
            return root;
        }

        // const components = Promise.all(tasks);
        Promise.all(tasks).then(function (cs) {

            cs && (cs.length>0) && cs.forEach(function (component) {

                if(register){
                    register(component.default || component);
                }

                components[component.name] = component;
            });

        }).catch(function (e) {
            console.error(e);
        }).finally(function () {
            next();
        });


    }
}


module.exports = plugin;


// var xtend = require('xtend');
// const visit = require('unist-util-visit');
//
// module.exports = function createPlugin(options) {
//
//     const {isPlugin, COMPONENT_NAME, loadComponent, PLUGIN_NAME} = options;
//
//     function plugin(options = {}) {
//
//         var settings = xtend(options, this.data('settings'));
//
//         const register = settings.register;
//
//         let hasComponent = false;
//
//         return async function transformer(root, file, next) {
//
//             visit(root, function (node) {
//                 return isPlugin(node);
//             }, function (node) {
//
//                 const data = node.data || {};
//
//                 Object.assign(data, {
//                     props: {
//                         code: node.value
//                     }
//                 });
//
//                 node.tagName = COMPONENT_NAME;
//
//                 node.children = [];
//
//                 hasComponent = true;
//
//             });
//
//
//             if(!hasComponent ){
//                 next();
//                 return root;
//             }
//
//
//             const component = await loadComponent();
//             if(register){
//                     register(component.default || component);
//             }
//             next();
//
//             // require.ensure([], function(){
//             //     const component = require('./component');
//             //     if(component && register){
//             //         register(component);
//             //     }
//             //     next();
//             // }, COMPONENT_NAME);
//
//             // const component = await import(
//             //     /* webpackChunkName: "vremark-component-flowchart" */
//             //     './component');
//             //
//             // if(register){
//             //     register(component.default || component);
//             // }
//
//
//
//         };
//
//     }
//
//     return plugin;
//
// };
