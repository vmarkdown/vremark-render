module.exports = {

    root: function(h, node, data, children) {
        return h(node.tagName || 'div', data, children);
    },
    element: function(h, node, data, children, options) {
        // if(data.plugin && data.component) {
        //     return h(data.component, data);
        // }
        return h(node.tagName, data, children);
    },
    text: function(h, node) {
        return node.value;
    },
    // component: function(h, node, data) {
    //     return h(node.tagName, data);
    // },
    raw: function(h, node, data) {
        data = {
            domProps: {
                innerHTML: node.value
            }
        };
        return h('div', data);
    }

};
