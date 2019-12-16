<<<<<<< HEAD
module.exports={
    css:{
        loaderOptions:{
            less:{
                globalVars:{
                    primary_color:'#42b983'
                }
=======
module.exports = {
    css: {
        loaderOptions: {
            less: {
                // ant design的less样式使用了mixin，需要启动JavaScript，否则报错
                javascriptEnabled: true
>>>>>>> 46a8db77107fab41c32ab1000489e552e95665f0
            }
        }
    }
}