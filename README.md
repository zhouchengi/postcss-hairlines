# PostCSS Hairlines

[PostCSS] plugin for transform your border to retina hairlines.

[postcss]: https://github.com/postcss/postcss

Before:

```css
.foo {
  border: 1px solid red;
}
```

After:

```css
.foo {
  border: 1px solid red;
}
.hairlines .foo {
  border-width: 0.5px;
}
```

## Requirements

Set hairlines class. For example from [lib-flexible]:

[lib-flexible]: https://github.com/amfe/lib-flexible

```js
;(function(win, doc) {
  var docEl = doc.documentElement

  if (win.devicePixelRatio && win.devicePixelRatio >= 2) {
    var testEl = doc.createElement('div')
    var fakeBody = doc.createElement('body')
    testEl.style.border = '0.5px solid transparent'
    fakeBody.appendChild(testEl)
    docEl.appendChild(fakeBody)
    if (testEl.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)
```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-hairlines'),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage

## Options

### hairlinesClass

Type: `string` Default: `'hairlines'`

Class name of 1px border for retina devices

### cssModules

Type: `boolean` Default: `false`

if you have [cssModules] enabled, set to true
[cssmodules]: https://github.com/webpack-contrib/css-loader#modules

### ignoreComment

Type: `string` Default: `'hairlines-ignore'`

Set comment to ignored

ignore whole rule

```css
/* hairlines-ignore */
.foo {
  border: 1px solid red;
}
```

ignore single property

```css
.foo {
  border: 1px solid red; /* hairlines-ignore */
}
```
