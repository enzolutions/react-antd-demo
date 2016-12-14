var webpack = require("webpack");
var path = require('path');
var glob_entries = require('webpack-glob-entries');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OmitTildeWebpackPlugin = require('omit-tilde-webpack-plugin');

var MODULE_APP_DIR = path.resolve(__dirname, 'client/');
var extractLESS = new ExtractTextPlugin('styles/[name].css');

function getPlugins() {
    var plugins = [];
    plugins.push(
        new ExtractTextPlugin('styles/magicgen.css', {
            allChunks: true
        })
    );

    plugins.push(extractLESS);

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
            {test: /\.less$/i, loader: extractLESS.extract(['css','less'])},
            { test: /\.jsx?/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel'},
        ]
    }
};

module.exports = config;