const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const config = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    mode: 'development',
    devtool: 'eval',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.scss?$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js|jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { useBuiltins: 'usage', corejs: 3, targets: 'defaults' }],
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            {
                test: /\.ts|tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, 'mui-project1'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js'],
    },
};

if (currentTask == 'build') {
    config.mode = 'production';
    config.devtool = '';
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
    config.plugins.push(
        new MiniCssExtractPlugin({ filename: 'main.[hash].css' }),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
    );
}

module.exports = config;
