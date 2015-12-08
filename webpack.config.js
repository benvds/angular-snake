var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    // set the context (optional)
    context: __dirname + '/src',
    entry: './app/app.js',

        // enable loading modules relatively
    resolve: {
        root: [__dirname + "/src"]
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader:"babel" },
            // { test: /\.scss$/, loader: "style!css!resolve-url!sass?sourceMap"},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css?sourceMap!resolve-url?sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true") },
            { test: /\.json$/, loader: "json" },

            // load raw html files
            { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

            // load fonts and images
            { test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: "file" }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./node_modules")]
    },

        // support source maps
    devtool: "#inline-source-map",

    plugins: [
        new ExtractTextPlugin("styles.css?[hash]-[chunkhash]-[contenthash]-[name]", {
            disable: false,
            allChunks: true
        })
    ]
};
