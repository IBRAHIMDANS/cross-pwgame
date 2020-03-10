const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

/*module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
                resolve: {
                    extensions: ['.js','.jsx'],
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ],
    },
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
        }),
    ],
};*/
