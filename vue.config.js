const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/action": {
                    target: 'http://localhost:3001'
                }
            }
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }
}
