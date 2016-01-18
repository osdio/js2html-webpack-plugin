var fs = require('fs');


function JS2Html(options) {
    this.options = options || {};
}


JS2Html.prototype.apply = function (compiler) {
    var template = this.options.template;
    if (!template) return;
    var html = fs.readFileSync(template, 'utf8');

    compiler.plugin("emit", function (compilation, callback) {
        Object.keys(compilation.assets).forEach(function (item, index) {
            var temp = '';
            if (/^.*\.js$/g.test(item)) {
                temp = html.replace(/(<\/body>)/i, function (match) {
                    return '<script>' + compilation.assets[item].source() + '<\/script>' + match;
                });
                compilation.assets[item.replace('.js', '') + '.html'] = {
                    source: function () {
                        return temp;
                    },
                    size: function () {
                        return temp.length;
                    }
                };
                delete compilation.assets[item];
            }
        });
        callback();
    });
};

module.exports = JS2Html;