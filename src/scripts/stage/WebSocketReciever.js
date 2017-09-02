// import C from './constantsStage';
// import utils from './utils/utils';
// import moment from 'moment';
import io from 'socket.io-client';

/**
 * WebSocketを受け取るクラス
 */
export default class WebSocketReciever {
  constructor(meteor, timeState, constellation) {
    this.meteor = meteor;
    this.timeState = timeState;
    this.constellation = constellation;
    this.socket = null;
    this.init();
  }
  
  init() {
    this.socket = io();
    
    // websocketが来たら流れ星を流す
    this.socket.on('SHOOTING', (data) => {
      this.meteor.shooting(data);
    });
    
    // 星座を表示
    this.socket.on('SHOW_CONSTELLATION', () => {
      this.constellation.show();
    });
    
    // 最後のメッセージを表示
    this.socket.on('SHOW_LAST_MESSAGE', () => {
      this.constellation.showLastMessage();
    });
    
    
    
    // 夜になる
    this.socket.on('START_NIGHT', () => {
      console.log('START_NIGHT');
      this.meteor.shooting();
      this.constellation.hideAll(); // 星座をすべて隠す
      this.timeState.start();
    });
  }

}
