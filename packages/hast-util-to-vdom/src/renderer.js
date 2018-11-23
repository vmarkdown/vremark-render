module.exports = {

    root: function(h, node, data, children) {
        return h(node.tagName || 'div', data, children);
    },
    element: function(h, node, data, children, options) {
        return h(node.tagName, data, children);
    },
    text: function(h, node) {
        return node.value;
    },
    component: function(h, node, data) {
        return h(node.component, data);
    },
    raw: function(h, node, data) {
        data = {
            domProps: {
                innerHTML: node.value
            }
        };
        return h('div', data);
    }

};
