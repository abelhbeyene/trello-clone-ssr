process.env.NODE_ENV = 'development'

require('ignore-styles');

require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: [
        'babel-plugin-dynamic-import-node', 
        '@babel/plugin-proposal-class-properties'
    ]
})

require('./index');