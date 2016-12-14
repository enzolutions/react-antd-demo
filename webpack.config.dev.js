var webpack = require("webpack");
var path = require('path');
var glob_entries = require('webpack-glob-entries');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OmitTildeWebpackPlugin = require('omit-tilde-webpack-plugin');

var MODULE_APP_DIR = path.resolve(__dirname, 'client/');

function getPlugins() {
    var plugins = [];

    plugins.push(
        new ExtractTextPlugin('styles/magicgen.css', {
            allChunks: true
        })
    );

    plugins.push(
        new OmitTildeWebpackPlugin({
            deprecate: false
        })
    );

    return plugins;
}

var config = {
    plugins: getPlugins(),
    entry: glob_entries('./app/*.jsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: require.resolve("react"), loader: "expose?React" },
            { test: /\.css$/, include:  path.resolve(__dirname, 'css'), loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.jsx?/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel'},
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};

module.exports = config;
