module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // injects CSS to page
                    'css-loader',   // translates CSS into CommonJS
                    'postcss-loader', // processes CSS with PostCSS
                    'resolve-url-loader', // resolves relative URLs
                    'sass-loader' // compiles Sass to CSS
                ],
            },
        ],
    },
};
