module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      externals: ["pdffiller"],
      build: {
        win: {
          publish: ["github"]
        },
        linux: {
          publish: ["snap"]
        }
      }
    }
  },
};
