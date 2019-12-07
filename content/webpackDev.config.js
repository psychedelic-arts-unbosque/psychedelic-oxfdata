var path = require('path');

module.exports = {
  mode: 'development',
  entry: "./content/src",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js",".jsx",".ts", ".tsx"]
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
  }
};