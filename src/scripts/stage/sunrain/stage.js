import TimeState from './TimeState';
import Sunrain from './Sunrain';
import WebSocketReciever from '../WebSocketReciever';
import redirect from '../../utils/redirect';

// モードによって画面を切り替える
redirect(true);

window.onload = () => {
  console.log('sunrain.js');
  
  // 時間管理
  const timeState = new TimeState();
  // 馬を管理する
  const sunrain = new Sunrain();
  // WebSocketを受け取る
  new WebSocketReciever(sunrain, timeState);
};
