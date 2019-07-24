module.exports = {
    entry: './src/movieApp/js/index.js',
    output: {
        path: require('path').resolve(__dirname, 'final'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './final'
    }
}