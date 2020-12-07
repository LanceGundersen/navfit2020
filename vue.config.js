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
          applicationId: "LanceGundersen.NavFit",
          identityName: "23182LanceGundersen.NavFit",
          publisher: "CN=A2D9DB40-6AB5-4D32-AA2E-C095DDE633A0",
          publisherDisplayName: "Lance Gundersen",
          displayName: "NavFit",
        }
      }
    }
  },
};
