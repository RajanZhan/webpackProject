const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require("fs");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const config = JSON.parse(fs.readFileSync("./config.json").toString());
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var entry = [];
if(config.debug == 1){
    entry = [HotScript, './browserSrc/main.js']
}
else
{
    entry = ['./browserSrc/main.js']
}

module.exports = {
    entry: entry,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader?{"presets":["es2015"],"plugins": ["transform-object-rest-spread"]}',
                            css: 'vue-style-loader!css-loader'
                        }
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|ttf|eot|woff)$/,
                use: ['file-loader']
            },
            // {
            //   test: /\.json$/,
            //   loader: 'json-loader'
            // }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.vue'
        ],
        alias: {
            //配置vue文件路径，使用vue devtools调试故引入开发版本
            vue: path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.min.js'),
            '@': "../"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false,
            template: path.resolve(__dirname, './dist/index.html'),
            hash: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
		new UglifyJSPlugin()
    ]
};
