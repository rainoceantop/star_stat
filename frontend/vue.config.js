module.exports={
    css:{
        loaderOptions:{
            less:{
                globalVars:{
                    primary_color:'#42b983',
                    primary_width:'1200px'
                }
            }
        }
    },
    configureWebpack:{
        devtool: 'source-map'
    }
}