const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname,
        filename: 'pl-script.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] })
            }
        ]
    },
    plugins: [new ExtractTextPlugin('pl-styles.css'),HtmlWebpackPluginConfig]
}