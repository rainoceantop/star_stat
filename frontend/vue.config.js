module.exports = {
    css: {
        loaderOptions: {
            less: {
                //手动定制ant-design-vue的默认主题
                modifyVars: {
                    'primary-color': '#41B883',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                },
                //vue-cli3的默认值
                globalVars: {
                    primary_color: '#42b983',
                    primary_width: '1200px'
                },
                //此处按需加载则css文件不需要每个都手动添加，划重点
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}