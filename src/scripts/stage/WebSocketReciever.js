// import C from './constantsStage';
// import utils from './utils/utils';
// import moment from 'moment';
import io from 'socket.io-client';

/**
 * WebSocketを受け取るクラス
 */
export default class WebSocketReciever {
  constructor(mainInstance, timeState) {
    this.mainInstance = mainInstance;
    this.timeState = timeState;
    // this.constellation = constellation;
    this.socket = null;
    this.init();
  }
  
  init() {
    this.socket = io();
    
    // websocketが来たら流れ星を流す
    this.socket.on('SHOOTING', (data) => {
      this.mainInstance.shooting(data);
    });
    
    // // 星座を表示
    // this.socket.on('SHOW_CONSTELLATION', () => {
    //   this.constellation.show();
    // });
    // 
    // // 最後のメッセージを表示
    // this.socket.on('SHOW_LAST_MESSAGE', () => {
    //   this.constellation.showLastMessage();
    // });
    
    // アクション開始
    this.socket.on('START_ACTION', () => {
      console.log('START_ACTION');
      this.mainInstance.shooting();
      // this.constellation.hideAll(); // 星座をすべて隠す
      this.timeState.start();
    });
  }

}
