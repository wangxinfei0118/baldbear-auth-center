module.exports = {
    devServer: {
        port: 7000,
        host: "localhost",
        https: false,
        open: true,
        proxy: {
            [process.env.VUE_APP_BASE_API] :{  // '/dev-api': {
                // 目标服务器地址
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                    // 将 请求地址前缀 /dev-api 替换为 空的，
                    // '^/dev-api': '',
                    [ '^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },

    lintOnSave: false,
    productionSourceMap: false,
}