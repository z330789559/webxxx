const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5087',
        changeOrigin: true
  
      }
    }
  },
  transpileDependencies: true,
  lintOnSave:false
})
