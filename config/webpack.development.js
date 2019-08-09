const { join } = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');//清空启动时不必要log的信息
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); //启动成功失败提示
module.exports = {
    devServer: {
        contentBase: join(__dirname, '../dist'),
        historyApiFallback: true,
        hot: true,
        quiet: true,//清空启动时不必要log的信息
    },
    plugins: [
        //清空启动时不必要log的信息
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['你的应用运行地址是：http://localhost:8080/'],
                notes: ['请用 npm run client:server 启动项目']
            },
            onErrors: function (severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
            },
            clearConsole: true,

        }),
        //启动成功失败提示
        new WebpackBuildNotifierPlugin({
            title: "启动typeScript-webpack项目",
            suppressSuccess: true
        })
    ]

}