const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

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
    },
    // 直接在config里面改好像不行
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(path.resolve('./src/assets'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.resolve('./src/assets'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
