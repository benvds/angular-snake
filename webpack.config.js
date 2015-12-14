var path = require('path');
var _ = require('lodash');
var minimist = require('minimist');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DEFAULT_TARGET = 'BUILD';

var DEFAULT_PARAMS = {
    resolve: {
        root: [__dirname + "/src"]
    },
    context: __dirname + '/src',
    entry: './app/app.js',
    output: {
        filename: "bundle.js",
        path: __dirname + "/build/",
        publicPath: "/assets/"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader:"babel" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css?sourceMap!resolve-url?sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true") },
            { test: /\.json$/, loader: "json" },
            { test: /\.html$/, exclude: /node_modules/, loader:"raw" },
            { test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: "file" }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./node_modules")]
    },
    plugins: [
        new ExtractTextPlugin("styles.css?[hash]-[chunkhash]-[contenthash]-[name]", {
            disable: false,
            allChunks: true
        })
    ],
    devServer: {
        contentBase: 'src/',
        port: 8080
    },
    debug: true,
    progress: true,
    colors: true
};

var TARGET_PARAMS = {
    DEV: {
        devtool: 'inline-source-map',
        output: {
            // filename: '[name].js',
            filename: "bundle.js",
            path: __dirname + "/build/",
            publicPath: "/assets/"
        }
    },

    BUILD: {
        output: {
            // path: './build'
            filename: "bundle.js",
            path: __dirname + "/build/",
            publicPath: "/assets/"
        },
        devtool: 'source-map',
        // plugins: [
        //     new CleanWebpackPlugin(['build'])
        // ]
    },

    DIST: {
        debug: false,
        output: {
            path: './dist',
            filename: "bundle.js",
            // path: __dirname + "/build/",
            publicPath: "/assets/"
        },
        plugins: [
            // new CleanWebpackPlugin(['dist']),
            new webpack.optimize.UglifyJsPlugin({
                mangle: false
            })
        ]
    }
};

var target = _resolveBuildTarget(DEFAULT_TARGET)
var params = _.merge(DEFAULT_PARAMS, TARGET_PARAMS[target], _mergeArraysCustomizer);

_printBuildInfo(target, params);

module.exports = params;

function _resolveBuildTarget(defaultTarget) {
    var target = minimist(process.argv.slice(2)).TARGET;
    if (!target) {
        console.log('No build target provided, using default target instead\n\n');
        target = defaultTarget;
    }
    return target;
}

function _printBuildInfo(target, params) {
    console.log('\nStarting "' + target + '" build');
    if (target === 'DEV') {
        console.log('Dev server: http://localhost:' + params.devServer.port + '\n\n');
    } else {
        console.log('\n\n');
    }
}

function _mergeArraysCustomizer(a, b) {
    if (_.isArray(a)) {
        return a.concat(b);
    }
}
