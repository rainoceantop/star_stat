module.exports = {
    css: {
        loaderOptions: {
            less: {
                // ant design的less样式使用了mixin，需要启动JavaScript，否则报错
                javascriptEnabled: true
            }
        }
    }
}