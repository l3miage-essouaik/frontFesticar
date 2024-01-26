const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const url = process.env.VUE_APP_BACKEND_URL
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
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: url, // URL de votre backend
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // Supprimez le préfixe '/api' de la requête
        }
      }
    }
  }
};
