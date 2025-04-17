const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/client/app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/', // Required for dev server
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: ['ejs-compiled-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
    resolve: {
        extensions: ['.js']
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 4000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
};
