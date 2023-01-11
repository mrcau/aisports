const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  pwa: {
    manifestOptions: {
      name: 'Ai-Gym',
      short_name: 'Ai-Gym',
      description: '체력향상을 위한 Ai 운동 프로그램',
      theme_color: '#ccf863',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
         {
           src: "./img/icons/android-icon-36x36.png",
           sizes: "36x36",
           type: "image\/png",
           density: "0.75"
                },
          {
           src: "./img/icons/android-icon-48x48.png",
           sizes: "48x48",
           type: "image\/png",
           density: "1.0"
                    },
          {
           src: "./img/icons/android-icon-72x72.png",
           sizes: "72x72",
           type: "image\/png",
           density: "1.5"
                    },
          {
           src: "./img/icons/android-icon-96x96.png",
           sizes: "96x96",
           type: "image\/png",
           density: "2.0"
                    },
          {
           src: "./img/icons/android-icon-144x144.png",
           sizes: "144x144",
           type: "image\/png",
           density: "3.0"
                    },
          {
           src: "./img/icons/android-icon-192x192.png",
           sizes: "192x192",
           type: "image\/png",
           density: "4.0"
            }
      ]
    },
    start_url: '.',
    orientation: 'portrait',
    display: 'fullscreen',
    background_color: '#595959'
  }
});
