module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Clipboard TTS",
                win: {
                  icon: "./electron-assets/icon.png"
                },
              },
        }
    },
}