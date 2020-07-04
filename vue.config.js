module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  assetsDir: "static",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Validar RFC/NSS";
      return args;
    });
  }
};
