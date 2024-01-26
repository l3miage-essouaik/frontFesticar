const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          config: './postcss.config.js',
        },
      },
    },
  },
  devServer:{
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL de votre backend
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // Supprimez le préfixe '/api' de la requête
        }
      }
    }
  }
};
