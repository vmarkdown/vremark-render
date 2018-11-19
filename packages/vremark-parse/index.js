module.exports = function plugin() {
    this.Parser = function (doc, file) {
        var hast = {};

        Object.assign(hast, {
            children: file.children || []
        });

        if(file.data) {
            Object.assign(hast, {
                data: file.data
            });
        }

        if(file.position) {
            Object.assign(hast, {
                position: file.position
            });
        }

        if(file.tagName) {
            Object.assign(hast, {
                tagName: file.tagName
            });
        }

        if(file.type) {
            Object.assign(hast, {
                type: file.type
            });
        }

        return hast;
    };
};


