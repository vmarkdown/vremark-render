const unified = require('unified');
const Vue = require('vue').default;

const vremark = {
    async parse(md, options) {
        const parse = require('vremark-parse');
        const stringify = require('vremark-parse/packages/vremark-stringify');
        const processor = unified().use(parse).use(stringify).data('settings', options);
        const file = await processor.process(md);
        return file.contents;
    },
    async render(hast, options) {
        const render = require('../../index');
        const flowchart = require('../plugins/vremark-plugin-flowchart');
        const processor = unified().use(flowchart).use(render).data('settings', options);
        const file = await processor.process(hast);
        return file.contents;
    }
};

function register(component) {
    Vue.component(component.name, component);
}

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const h = this.$createElement;

            const hast = await vremark.parse(md, {
                config: {
                    root: {
                        tagName: 'main',
                        class: 'markdown-body'
                    }
                }
            });

            console.log(hast);

            const vdom = await vremark.render(hast, {
                h: h,
                register: register
            });

            console.log(vdom);

            this.vdom = vdom;

            this.$forceUpdate();

        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

(async ()=>{
    const md = require('../md/test.md');
    app.update(md);
})();


