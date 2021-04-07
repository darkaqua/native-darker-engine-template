const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, SourceMapDevToolPlugin } = require("webpack");
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

const ROOT = path.resolve( __dirname, 'src' );

module.exports = {
    context: ROOT,
    entry: './index.production.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
            },
            /****************
             * PRE-LOADERS
             *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            /****************
             * LOADERS
             *****************/
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            template: `${ROOT}/index.html`,
        }),
        new HtmlInlineScriptPlugin(),
        new DefinePlugin({
            DATA: JSON.stringify(require("./package.json").data)
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
};
