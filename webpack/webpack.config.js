const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let cssLoaders = extra => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'postcss-loader',
        'group-css-media-queries-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}


module.exports = {
    // говорим где лежат все исходники нашего приложения
    context: path.resolve(__dirname, 'src'),
    // указываем режим разработки проекта
    mode: 'development',
    // указываем какой файл является входным для нашего проекта
    entry: {
        main: './scripts/index.js'
    },

    // куда наш файл отправлять в результате работы вебпака
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script/[name].[hash].js',
        clean: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist/')
        },
        port: 4000,
        open: true
    },
    // для добовления и использования любых плагинов
    plugins: [
        // говорим html файл добавлять в папку dist
        new HtmlWebpackPlugin({
            template: './index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.pug$/i,
                loader: 'pug-loader'
            },
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(jpg|png|svg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images[name][hash][ext]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts[name][hash][ext]'
                }
            },
            {
                test: /\.js$/i,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }


}

