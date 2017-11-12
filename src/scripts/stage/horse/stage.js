import TimeState from './TimeState';
import Horse from './Horse';
import WebSocketReciever from '../WebSocketReciever';
import redirect from '../../utils/redirect';

// モードによって画面を切り替える
redirect(true);

window.onload = () => {
  console.log('horse/stage.js');
  
  // 時間管理
  const timeState = new TimeState();
  // 馬を管理する
  const horse = new Horse();
  
  // WebSocketを受け取る
  new WebSocketReciever(horse, timeState);
};
