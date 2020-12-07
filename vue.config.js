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
          publisher: "A2D9DB40-6AB5-4D32-AA2E-C095DDE633A0",
          publisherDisplayName: "Lance Gundersen",
          identityName: "23182LanceGundersen.NavFit",
          displayName: "NavFit",

        }
      }
    }
  },
};
