const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const resolve = (dir)=> {
    return path.join(__dirname, dir);
};

module.exports = {
    mode:'development',
    entry: resolve('./src/entries/index.js'),
    output: {
        publicPath: '/',
        filename:'bundle.js',
        path: resolve('dist'),
    },
    module: {
        rules:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:'eslint-loader',
            enforce: 'pre'
        },
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:'babel-loader'
        },
        {
            test:/\.css$/,
            use:[
                { loader:'style-loader' },
                { loader:'css-loader' },
                { loader:'postcss-loader'}
            ]
        },
        {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                { 
                    loader:'postcss-loader'
                },
                {
                    loader:'less-loader'
                },
            ]
        },
        {
            test:/\.(ttf|eot|svg|woff|woff2)$/,
            use:'url-loader'
        },
        {
            test:/\.(jpg|png|webp|bmp|icon|gif|jpeg)$/,
            use:'url-loader?limit=6000&name=[hash:8]-[name].[ext]'
        },
        {
            test:/\.vue$/,
            exclude:/node_modules/,
            use:'eslint-loader',
            enforce: 'pre'
        },
        {
            test:/\.vue$/,
            use:'vue-loader'
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "vue$": "vue/dist/vue.js",
            "@imgs": resolve('src/assets/img'),
            "@css": resolve('src/assets/css'),
            "@components": resolve('src/components'),
            "@views": resolve('src/views'),
            "@json": resolve('src/assets/json'),
            "@store": resolve('src/store'),
            "@router": resolve('src/router'),
            "@api": resolve('src/api'),
            "@js": resolve('src/assets/js')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: resolve('src/template/index.html'),
            filename:'index.html',
            minify:{
                collapseWhitespace: true,
                minifyCSS: true,
                removeComments: true,
            },
            favicon: resolve('favicon.ico')
        }),
        new webpack.DefinePlugin({
            API_CONFIG: JSON.stringify('/api')
        })
    ],
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        port: 3000,
        hot: true,
        proxy: {
            '/api': {
                target: 'https://www.elric.club:8000/',
                pathRewrite: {"^/api" : ""},
                changeOrigin: true,
                secure: false
            }
        }
    }
}