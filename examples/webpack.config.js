const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const base = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    resolve: {
        alias: {
            // 'unist-util-data': path.resolve(__dirname, '../packages', 'unist-util-data', 'index.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader/useable" ,
                        options: {
                            // singleton: true,
                            // attrs: {}
                        }
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(md|html)$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/index.html'
        })
    ],
    devServer: {
        hot: false,
        inline: false,
        contentBase: [
            path.resolve(__dirname, "dist"), path.resolve(__dirname, "www")
        ]
    }
};

module.exports = [
    merge(base, {
        entry: {
            'example-main': path.resolve(__dirname, 'src/index.js')
        },
    }),
    // merge(base, {
    //     entry: {
    //         'vremark-plugin-flowchart': path.resolve(__dirname, 'plugins/','vremark-plugin-flowchart', '/index.js')
    //     },
    //     output: {
    //         libraryTarget: "amd"
    //     }
    // })
];

