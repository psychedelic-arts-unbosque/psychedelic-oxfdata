var path = require('path');

module.exports = {
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js",".jsx",".ts", ".tsx", ".css"]
    },

    entry: "./content/src", // string | object | array

    output: {
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "content.js", // string
        // the filename template for entry chunks
        publicPath: "/assets/", // string
        // the url to the output directory resolved relative to the HTML page
      },
   module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, './content/src'),
        compress: true,
        port: 3000
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },

};