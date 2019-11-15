const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: 'image-webpack-loader',
                enforce: 'pre'
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader']
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './src/html/index.html',
            favicon: './src/images/logo.ico'
        })
    ]
}