/**
 * Created by happyu on 2017/10/4.
 */
const webpack = require('weboack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const sourcePath = path.join(__dirname, './static/src');
const outputPath = path.join(__dirname, './static/output/dist/');

module.exports = {
    entry: {
        'admin': './static/src/pages/admin.js',
        'work': './static/src/pages/work.js',
        'index': './static/src/pages/index.js',
        'error': './static/src/pages/error.js',
        vendor: ['react', 'react-dom', 'whatwg-fetch'],
    },
    output: {
        path: outputPath,
        publicPath: '/static/output/dist/',
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        // presets: ['se2015','react']
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader']
                }),
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            sourcePath,
            'node_modules'
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity,
            filename: 'js/[name].js'
        })
    ]
};