<template>
       
    <div class="gamescreen" :style="`min-height:${screenH}px`" ref="gameScreen" >
      <div class="d-flex justify-space-between mr-3">
         <h4 class="white--text ml-3" v-if="count>0">{{count}} </h4>
         <div v-if="count>0">  <v-icon color="pink"   v-for="(n,i) in energy" :key="i" class="mt-2 " >mdi-heart</v-icon>   </div>
      </div>
       <div ref="enermy" :style="`position:absolute;transform:translate(${exx}px,${eyy}px);width:${monSize}px`"
       style="transition: all" >
          <v-avatar tile :size="enermySize"  >
           <img :src="`${require('../assets/img/dumbel.png')}`" style="position:absolute;top:0;left:0"/>
          </v-avatar>
       </div>
       <div ref="enermy2" :style="`position:absolute;transform:translate(${exx}px,${eyy}px);width:${monSize}px`" >
          <v-avatar tile :size="enermySize"  >
           <img :src="`${require('../assets/img/dumbel.png')}`" style="position:absolute;top:0;left:0"/>
          </v-avatar>
       </div>
       <div ref="banana" :style="`position:absolute;transform:translate(${bxx}px,${byy}px);width:${monSize}px`" >
          <v-avatar tile :size="enermySize"  >
           <img :src="`${require('../assets/img/banana.png')}`" style="position:absolute;top:0;left:0"/>
          </v-avatar>
       </div>
       <div ref="spotato" :style="`position:absolute;transform:translate(${pxx}px,${pyy}px);width:${monSize}px`" >
          <v-avatar tile :size="enermySize"  >
           <img :src="`${require('../assets/img/sweetpotato.png')}`" style="position:absolute;top:0;left:0"/>
          </v-avatar>
       </div>
       <div ref="egg" :style="`position:absolute;transform:translate(${gxx}px,${gyy}px);width:${monSize}px`" >
          <v-avatar tile :size="enermySize"  >
           <img :src="`${require('../assets/img/egg.png')}`" style="position:absolute;top:0;left:0"/>
          </v-avatar>
       </div>
       <div ref="monster"  :style="`left:${xx+monSize>gameScreenW?gameScreenW-monSize:xx}px;width:${monSize}px`"
       style="position:absolute;bottom:15px;" :class="reverse?'reverse':''" >
       <!-- <div ref="monster" :class="reverse?'reverse':''" :style="`position:absolute;top:${yy}px;left:${xx}px;width:${monSize}px`"
       style="transition: all" > -->
        <v-avatar tile :size="monSize" >
           <img :src="`${require('../assets/img/fire3.gif')}`" style="position:absolute;top:0;left:0" v-if="egg"/>
           <img :src="`${require('../assets/img/fire1.gif')}`" style="position:absolute;top:0;left:0" v-if="banana"/>
           <img :src="`${require('../assets/img/monster.png')}`" style="position:absolute;top:10;left:10"   />
          </v-avatar>
       </div>
    
      <div class="d-flex " style="z-index:2;">
       <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="btnRun('left') "  >
         <v-icon>mdi-arrow-left-bold</v-icon>
       </v-btn>
       <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="playGame" v-if="!start" >
         <v-icon>mdi-play</v-icon>
       </v-btn>
       <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="stopGame" v-else >
         <v-icon>mdi-stop</v-icon>
       </v-btn>
       <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="btnRun('right') "  >
         <v-icon>mdi-arrow-right-bold</v-icon>
       </v-btn>
      </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'GameFly',
      data () {
        return {
          uid: this.$store.state.fireUser.uid || '',
          screenH: 150,
          xx: 200,
          xxx: 10,
          yy: 80,
          exx: 250,
          eyy: -40,
          pxx: 250,
          pyy: -140,
          gxx: 50,
          gyy: -200,
          bxx: 200,
          byy: -400,
          reverse: false,
          // eyy+enermySize > yy && exx+enermySize > xx && exx < xx+mon.monSize
          key: '',
          egg: false,
          monSize: 60,
          enermySize: 30,
          enermyContact: false,
          itemContact: false,
          start: false,
          stop: true,
          restart: false,
          banana: false,
          countInterval: '',
          enermyInterval: '',
          bananaInterval: '',
          timerInterval: '',
          detecIntervel: '',
          detecIntervel2: '',
          detecIntervel3: '',
          playTimeOut: '',
          starTimeOut: '',
          hitSound1: new Audio(require('@/assets/mp3/hitsound1.mp3')),
          hitSound2: new Audio(require('@/assets/mp3/hitsound2.mp3')),
          eatsound: new Audio(require('@/assets/mp3/eatsound.mp3')),
          enermySpeed: 1,
          timer: 10,
          energy: 3,
          count: 0,
          hit: false,
          gameScreenW: window.innerWidth
          // mql: window.matchMedia('(orientation: portrait)')
          // media: matchMedia('screen and (min-width: 1024px)')
    
        }
      },
      created () {
        window.addEventListener('keydown', this.keyRun)
      },
      beforeDestroy () {
        this.stopGame()
        this.hitSound2.pause()
        window.removeEventListener('resize', this.resize)
        window.removeEventListener('orientationchange', this.resizeWH)
      },
    
      mounted () {
        window.addEventListener('resize', this.resize)
        window.addEventListener('orientationchange', this.resizeWH)
        // this.resizeWH()
      },
      beforeUnmount () {
        this.hitSound2.pause()
        window.removeEventListener('resize', this.resize)
        window.removeEventListener('orientationchange', this.resizeWH)
      },
      methods: {
        resizeWH () {
          if (window.matchMedia('(orientation: portrait)').matches) {
            this.keyRun(37)
            this.btnRun('left')
            if (this.gameScreenW < this.xx) {
              this.xx = this.gameScreenW - 50
            }
          } else {
            if (this.gameScreenW < this.xx) {
              this.xx = this.gameScreenW - 50
            }
          }
        },
        resize () {
          this.gameScreenW = window.innerWidth
          // console.log('resize', this.gameScreenW)
        }, 
    
        keyRun (e) {
          if (this.reverse) { return }
          const monster = this.$refs.monster ? this.$refs.monster.getBoundingClientRect() : 0
          const gameScreen = this.$refs.gameScreen ? this.$refs.gameScreen.getBoundingClientRect().width - monster.width : 0
          if (e.keyCode === 37) {
            if (monster.x > 0) {
              if (gameScreen < this.xx) {
                this.xx = gameScreen
              } else {
                this.xx -= this.xxx
              }
            }
          }
          if (e.keyCode === 39) {
            if (monster.x < gameScreen) {
              this.xx += this.xxx
            } else {
              this.xx = gameScreen
            }
          }
          // if (e.keyCode === 38) { this.yy -= 10; e.preventDefault() }
          // if (e.keyCode === 40) { this.yy += 10; e.preventDefault() }
        },
        btnRun (e) {
          if (this.reverse) { return }
          const monster = this.$refs.monster.getBoundingClientRect()
          const gameScreen = this.$refs.gameScreen.getBoundingClientRect().width - monster.width
          if (e === 'left') {
            if (monster.x > 0) {
              if (gameScreen < this.xx) {
                this.xx = gameScreen
              } else {
                this.xx -= this.xxx
              }
            }
          }
          if (e === 'right') {
            if (monster.x < gameScreen) {
              this.xx += this.xxx
            } else {
              this.xx = gameScreen
            }
          }
          if (e === 'up') { this.yy -= 10 }
          if (e === 'down') { this.yy += 10 }
        },
        playGame () {
          // this.count = this.timer
          this.count = 0
          // this.screenH = 200
          this.xxx = 10
          this.start = true
          this.stop = false
          this.hit = false
          this.reverse = false
          this.energy = 3
          this.enermySpeed = 1
          this.dropDumbel()
          this.dropBanana()
          this.dropPotato()
          this.dropEgg()
          this.gameTimer()
          this.bananaHit()
          this.potatoHit()
          this.dumbelHit()
          this.eggHit()
        },
        stopGame () {
          // this.screenH = 150
          this.start = false
          this.stop = true
          this.eyy = -40
          this.pyy = -400
          this.gyy = -400
          this.byy = -200
          this.stop = true
          this.hitSound1.pause()
          this.eatsound.pause()
          clearInterval(this.timerInterval)
          clearInterval(this.enermyInterval)
          clearInterval(this.bananaInterval)
          clearInterval(this.countInterval)
          clearInterval(this.spotatoInterval)
          clearInterval(this.eggInterval)
          clearInterval(this.detecIntervel)
          clearInterval(this.detecIntervel2)
          clearInterval(this.detecIntervel3)
          clearInterval(this.detecIntervel4)
        },
    
        gameTimer () {
          this.timerInterval = setInterval(() => {
            if (this.count === 10) { this.enermySpeed = 2; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 20) { this.enermySpeed = 3; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 30) { this.enermySpeed = 4; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 40) { this.enermySpeed = 5; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 50) { this.enermySpeed = 6; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 60) { this.enermySpeed = 7; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 70) { this.enermySpeed = 8; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 80) { this.enermySpeed = 9; clearInterval(this.enermyInterval); this.dropDumbel() }
            if (this.count === 90) { this.enermySpeed = 10; clearInterval(this.enermyInterval); this.dropDumbel() }
            this.count++
            // this.enermySpeed++
          }, 1000)
        },
        dropDumbel () {
          const gameScreenH = this.$refs.gameScreen.getBoundingClientRect().height
          this.enermyInterval = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.enermy.getBoundingClientRect().width
            // 게임종료
            if (this.stop || this.energy < 1) {
              this.reverse = true
              this.hitSound2.play()
              this.stopGame()
              return
            }
            // 물건 떨어지기
    
            if (this.$refs.enermy.getBoundingClientRect().y < gameScreenH) {
              this.eyy += 5
            } else {
              this.hit = false
              this.eyy = -40
              this.exx = Math.floor(Math.random() * gameScreenW)
            }
          }, Math.floor(200 / this.enermySpeed))
        },
        dumbelHit () {
          this.detecIntervel = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.enermy.getBoundingClientRect().width
            const mon = this.$refs.monster.getBoundingClientRect()
            const emy = this.$refs.enermy.getBoundingClientRect()
            if (emy.y + this.enermySize > mon.y && emy.x + this.enermySize > mon.x && emy.x < mon.x + this.monSize) {
              // this.hit = true
              this.eyy = -40
              if (!this.egg) {
                this.energy--
                this.banana = false
                this.xxx = 10
                this.hitSound1.play()
              } else {
                this.egg = false
              }
              this.exx = Math.floor(Math.random() * gameScreenW)
            }
          }, Math.floor(200 / this.enermySpeed))
        },
        dropBanana () {
          const gameScreenH = this.$refs.gameScreen.getBoundingClientRect().height
          this.bananaInterval = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.banana.getBoundingClientRect().width
            // 게임종료
            if (this.stop || this.energy < 1) {
              clearInterval(this.bananaInterval)
              return
            }
            // 물건 떨어지기
            if (this.$refs.banana.getBoundingClientRect().y < gameScreenH) {
              this.byy += 5
            } else {
              this.hit = false
              this.byy = -200
              this.bxx = Math.floor(Math.random() * gameScreenW)
            }
          }, 100)
        },
        bananaHit () {
          this.detecIntervel2 = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.banana.getBoundingClientRect().width
            const mon = this.$refs.monster.getBoundingClientRect()
            const emy = this.$refs.banana.getBoundingClientRect()
            if (emy.y + this.enermySize > mon.y && emy.x + this.enermySize > mon.x && emy.x < mon.x + this.monSize) {
              // this.hit = true
              this.byy = -300
              this.banana = true
              this.eatsound.play()
              if (this.xxx < 40) {
                this.xxx += 10
              }
              this.bxx = Math.floor(Math.random() * gameScreenW)
            }
          }, Math.floor(200 / this.enermySpeed))
        },
        dropPotato () {
          const gameScreenH = this.$refs.gameScreen.getBoundingClientRect().height
          this.spotatoInterval = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.spotato.getBoundingClientRect().width
            if (this.$refs.spotato.getBoundingClientRect().y < gameScreenH) {
              this.pyy += 5
            } else {
              this.hit = false
              this.pyy = -400
              this.pxx = Math.floor(Math.random() * gameScreenW)
            }
          }, 100)
        },
        potatoHit () {
          this.detecIntervel3 = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.spotato.getBoundingClientRect().width
            const mon = this.$refs.monster.getBoundingClientRect()
            const emy = this.$refs.spotato.getBoundingClientRect()
            if (emy.y + this.enermySize > mon.y && emy.x + this.enermySize > mon.x && emy.x < mon.x + this.monSize) {
              // this.hit = true
              this.pyy = -300
              this.eatsound.play()
              if (this.energy < 10) {
                this.energy++
              }
              this.pxx = Math.floor(Math.random() * gameScreenW)
            }
          }, Math.floor(200 / this.enermySpeed))
        },
        dropEgg () {
          const gameScreenH = this.$refs.gameScreen.getBoundingClientRect().height
          this.eggInterval = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.egg.getBoundingClientRect().width
            if (this.$refs.egg.getBoundingClientRect().y < gameScreenH) {
              this.gyy += 5
            } else {
              this.hit = false
              this.gyy = -500
              this.gxx = Math.floor(Math.random() * gameScreenW)
            }
          }, 100)
        },
        eggHit () {
          this.detecIntervel4 = setInterval(() => {
            const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.egg.getBoundingClientRect().width
            const mon = this.$refs.monster.getBoundingClientRect()
            const emy = this.$refs.egg.getBoundingClientRect()
            if (emy.y + this.enermySize > mon.y && emy.x + this.enermySize > mon.x && emy.x < mon.x + this.monSize) {
              // this.hit = true
              this.eatsound.play()
              this.gyy = -300
              this.egg = true
              this.gxx = Math.floor(Math.random() * gameScreenW)
            }
          }, Math.floor(200 / this.enermySpeed))
        }
    
      }
    }
    </script>
    <style scoped>
    .reverse{
      transform: rotate( 90deg );
    }
    .gamescreen{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position:relative;
        overflow:hidden;
      /* background-image:url('@/assets/menu/banner0.png'); */
      background-size: cover;
      background-repeat:no-repeat;
      background-position:center bottom
    }
    </style>
    