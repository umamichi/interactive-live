import io from 'socket.io-client';
import Vue from 'vue/dist/vue.js';
import redirect from '../utils/redirect';
const socket = io();
redirect(); // リダイレクト

window.onload = () => {
  // controll vue
  new Vue({
    el: '#controller',
    data: {
      isTutorial: false,
      isAble: [true, true, true], // すでにクリックしたかどうか
      times: {
        starChargeSec: 3, // 星をチャージする時間
        starFlightSec: 0.4 // ボタンを押した直後の星が飛ぶのにかかる時間
      },
      isControll: true, // 操作できるかどうか
      isShooting: false, // 送信中
      isWaiting: false, // ショット後、画面ロック
      isCharging: false, // 星をチャージしているかどうか
      isShowStar: false, // 星を表示するかどうか 
      // objectStyle: {
      //   background: '#fff',
      //   filter: 'drop-shadow(0px 0px 10px #fff) drop-shadow(0px 0px 10px #fff) drop-shadow(0px 0px 10px #fff) drop-shadow(0px 0px 10px #fff)'
      // },
      colors: [
        { color: '#fff', isSelected: true },
        { color: '#FE9191', isSelected: false },
        { color: '#FECE91', isSelected: false },
        
        { color: '#A0FE91', isSelected: false },
        { color: '#91D2FE', isSelected: false },
        { color: '#FE91F1', isSelected: false },
      ],
      
      isShowNoise: false
    },
    created() {
      // テストモード、1秒おきに星を飛ばそうとする
      if (location.hash === '#testmode') {
        setInterval(() => {
          if (!this.isShooting) {
            const randNum = Math.floor(Math.random() * ( this.colors.length + 1 ));
            this.selectColor(this.colors[randNum]);
            this.shooting();  
          }
        }, 1000);
      }
      
      // チュートリアル、無限に星を送信できる
      if (location.hash === '#tutorial') {
        this.isTutorial = true;
        this.isAble = [true];
      }
      
      // 馬の画面だけ、雷を出すイベント定義
      if (location.href.match(/horse/)) {
        socket.on('START_ACTION', () => {
          // console.log('START_ACTION');
          this.isShowNoise = true;
        });  
      }
    },
    methods: {
      // 色を選択
      selectColor(color) {
        this.colors.forEach((_color) => {
          _color.isSelected = false;
        });
        color.isSelected = true;
      },
      
      // shooting
      shooting(number) {
        if (this.isShooting) {
          return;
        }
        // disableだった場合、何もしない
        if (!this.isAble[number]) {
          return;
        }
        
        // 押したことを記録。チュートリアル時は無限に押せる
        if (!this.isTutorial) {
          this.isAble[number] = false;
        }

        this.colors.forEach((_color) => {
          if (_color.isSelected) {
            console.log('submit', _color);
            
            // send websocket
            socket.emit('shooting', {
              color: _color.color
            });
            
            this.isShooting = true;
            this.isShowStar = true;
            
            // 星が飛んでいく
            setTimeout(() => {
              this.isWaiting = true;
              setTimeout(() => {
                // チャージ開始
                this.isCharging = true;
              }, 10);
              
              // チャージ
              setTimeout(() => {
                this.isShooting = false;
                this.isWaiting = false;
                this.isShowStar = false;
                this.isCharging = false;
              }, this.times.starChargeSec * 1000);
            }, this.times.starFlightSec * 1000);
          }
        });
      }
    }
  });
};
