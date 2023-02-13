const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  pwa: {
    manifestOptions: {
      name: 'Health and Fitness App',
      short_name: 'Ai-Gym',
      description: '체력향상을 위한 Ai 운동 프로그램',
      theme_color: '#ccf863',
      start_url: '.',
      scope: "/",
      orientation: 'portrait',
      display: 'fullscreen',
      background_color: '#595959',
      categories: ["lifestyle","utilities"],
      features: [
        { "name": "accelerometer"  },
        {  "name": "ambient-light-sensor" }
      ],   
      shortcuts: [
        {
          "name": "AI Fitness App",
          "url": "/",
          "description": "Health and Fitness App"
        }
      ],   
      permissions: [
        "accessibilityFeatures.read",
        "accessibilityFeatures.write",
        "alarms",
        "audio-capture",
        "background-fetch",
        "backgroundSync",
        "bluetooth",
        "camera",
        "clipboard-read",
        "clipboard-write",
        "geolocation",
        "gyroscope",
        "magnetometer",
        "microphone",
        "notifications",
        "persistent-storage",
        "push",
        "wake-lock"
      ],
      icons: [
        {src:"./img/icons/android-chrome-512x512.png",
        sizes:"512x512",
        type:"image/png"},
        {src:"./img/icons/android-chrome-maskable-512x512.png",
        sizes:"512x512",
        type:"image/png",
        purpose:"maskable"},
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
      ],
      screenshots : [
        {
          src: "./img/screenshot1.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot2.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot3.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot4.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot5.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot6.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot7.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        },        
        { src: "./img/screenshot8.jpg",
          sizes: "480x1060",
          type: "image/webp",
          label: "Homescreen of Awesome App"
        }
        
      ]
    }
  }
});
