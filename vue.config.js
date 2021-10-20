const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  chainWebpack: (config) => {
    function addLoader(params) {
      params.types.forEach((type) => {
        config.module
          .rule(params.rule)
          .oneOf(type)
          .use(params.loader)
          .loader(params.loader)
          .options(params.options)
          .end();
      });
    }

    addLoader({
      types: ["vue-modules", "vue", "normal-modules", "normal"],
      rule: "sass",
      loader: "sass-resources-loader",
      options: {
        includePath: resolve("src"),
        resources: "./src/sass/_common.sass",
      },
    });
  },
};
