const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                enforce: 'pre',
                test: /\.(js)$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.(ts)$/,
                loader: 'awesome-typescript-loader'
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
                loader: 'url-loader',
                options: {
                    // Images larger than 10 KB won’t be inlined
                    limit: 10 * 1024
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    helperDirs: [path.join(__dirname, './src/utils/handlebarsHelpers')],
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.ts']
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
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        })
    ]
}