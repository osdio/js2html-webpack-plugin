# js2html-webpack-plugin

> Used for compile the js into html.


## Install

```
npm i js2html-webpack-plugin --save-dev
```

## Example

```
 baseConfig.plugins = [
        new JS2HtmlPlugin({
            template: path.resolve('./examples/simple/index.html')
        })
    ];
```

## API

### template

html的路径