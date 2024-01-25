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
  devServer: {
    port: 8081 // Change the port here
}
};
