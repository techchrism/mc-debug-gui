const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/mcdebuggui/' : '/'
};
