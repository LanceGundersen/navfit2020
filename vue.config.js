module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      externals: ["pdffiller"],
      builderOptions: {
        win: {
          target: "appx",
        },
        appx: {
          publisherDisplayName: "Lance Gundersen",
          displayName: "NavFit",
        }
      }
    }
  },
};
