# webpack-config-validationscheme

 > Validate your webpack configs with joi

![dependencies](https://img.shields.io/david/js-dxtools/webpack-config-validationscheme.svg?style=flat-square)
![devDependencies](https://img.shields.io/david/dev/js-dxtools/webpack-config-validationscheme.svg?style=flat-square)
[![version](https://img.shields.io/npm/v/webpack-config-validationscheme.svg?style=flat-square)](http://npm.im/webpack-config-validationscheme)
[![downloads](https://img.shields.io/npm/dm/webpack-config-validationscheme.svg?style=flat-square)](http://npm-stat.com/charts.html?package=webpack-validator&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/webpack-config-validationscheme.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Writing webpack configs is brittle and error-prone. This package provides a [joi](https://github.com/hapijs/joi) object schema for webpack configs. This gets you a) static type safety, b) property spell checking and c) semantic validations such as "`loader` and `loaders` can not be used simultaneously" or "`query` can only be used with `loader`, not with `loaders`".

You're very welcome to give [feedback](https://github.com/js-dxtools/webpack-config-validationscheme/issues) & [PR's](https://github.com/js-dxtools/webpack-config-validationscheme).

### Example
Take this simple webpack config. It has a tiny, hard to spot error. Can you find it?
```js
var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'Redux',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};
```

webpack-config-validationscheme makes it easy:

![validation-example](https://cloud.githubusercontent.com/assets/3755413/14134087/b3279738-f654-11e5-9752-367b01ac123d.png)

### Usage
```js
var scheme = require('webpack-config-validationscheme')
var Joi = require('webpack-config-validationscheme').Joi
var webpackConfig = require('pathToYourConfig')

var validationResult = Joi.validate(webpackConfig, scheme, { abortEarly: false })
  if (validationResult.error) {
    console.info(validationResult.error.annotate())
  } else {
    console.info('Config is valid.'))
  }
```

#### Customizing
If you need to extend the schema, for example for custom top level properties or properties added by third party plugins like `eslint-loader` (which adds a toplevel `eslint` property), do it like this:

```js
var scheme = require('webpack-config-validationscheme')
var Joi = require('webpack-config-validationscheme').Joi
var webpackConfig = require('pathToYourConfig')

var yourScheme = scheme.concat(Joi.object({
  // this would just allow the property and doesn't perform any additional validation
  eslint: Joi.any()
}))
```

#### Support
Because this module uses the amazing `Joi` validation library, this module only supports Node >=4.0.0.

#### License
MIT
