module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      externals: ["pdffiller"],
      appId: "{APP_ID}",
      publish: "github",
      dmg: {
        contents: [
          {
            x: 110,
            y: 150
          },
          {
            x: 240,
            y: 150,
            type: "link",
            path: "/Applications"
          }
        ]
      },
      appImage: {
        license: "LICENSE"
      },
      nsis: {
        createDesktopShortcut: "always",
        license: "LICENSE"
      }
    }
  },
};
