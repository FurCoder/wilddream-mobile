module.exports = {
    'env': {
      'browser': true,
      'commonjs': true,
      'es6': true
    },
    'extends': 'eslint:recommended',
    'parser' : 'babel-eslint',
    'parserOptions': {
      'sourceType': 'module',
      'ecmaFeatures': {
        'experimentalObjectRestSpread': true,
        'jsx': true
      }
    },
    'plugins': [
      'react',
    ],
    'rules': {
      'no-trailing-spaces' : 1,
      'no-unused-vars' : 0,
      'no-case-declarations' : 0,
      'no-constant-condition' : 0,
      'no-debugger' : 0,
      'indent': [
        'error',
        2,
        {'SwitchCase' : 1}
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ],
      'no-console' : 0
    },
    'globals' : {
      'window' : true,
      'za' : true,
      'logger' : true,
      'Swiper' : true,
      'document' : true,
      'describe' : true,
      'it' : true,
      'console' : true,
      'range' : true,
      'is_array' : true,
      'sleep' : true,
      'process' : true,
      'time_format' : true,
      'localStorage' : true,
      '__dirname' : true,
      'request' : true,
      'remote_log' : true,
      'gtag' : true,
      'ga': true
    },
    'settings': {
      'react': {
        'createClass': 'createReactClass', // Regex for Component Factory to use,
        // default to "createReactClass"
        'pragma': 'React',  // Pragma to use, default to "React"
        'version': '16.0', // React version, default to the latest React stable release
      },
      'propWrapperFunctions': ['forbidExtraProps']
    }
  }
  