const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
    const { STAGE } = env;

    return {
        entry: {
            verification: './verification/index.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
                { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] }
            ]
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html'
            }),
            new HtmlWebpackPlugin({
                chunks: ['verification'],
                filename: 'verification.html',
                template: './verification/index.html'
            }),
            new webpack.NormalModuleReplacementPlugin(/(.*)environment.dev(\.*)/, function(resource) {
                resource.request = resource.request.replace(/environment.dev/, `environment.${STAGE}`);
            }),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080
        }
    }
};
