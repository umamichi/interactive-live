// import animation from './animation';
import TimeState from './TimeState';
// import BackgroundLayer from './layer/BackgroundLayer';
// import BackgroundCurtainLayer from './layer/BackgroundCurtainLayer';
// import MoonLayer from './layer/MoonLayer';
// import BackStarsLayer from './layer/BackStarsLayer';
// import MeteorLayer from './layer/MeteorLayer';
import Horse from './Horse';
// import Constellation from './Constellation';
import WebSocketReciever from '../WebSocketReciever';
import redirect from '../../utils/redirect';

// モードによって画面を切り替える
redirect(true);

window.onload = () => {
  console.log('horse/stage.js');
  
  // // 星座を表示する
  // const constellation = new Constellation();
  // 
  // // 時間管理
  const timeState = new TimeState();
  // 
  // 流れ星を管理する
  const horse = new Horse();
  // 
  // // 背景レイヤー
  // const backgroundLayer = new BackgroundLayer();
  // // 背景の上に乗せるレイヤー
  // const backgroundCurtainLayer = new BackgroundCurtainLayer(timeState);
  // // 背景の星レイヤー
  // const backStarsLayer = new BackStarsLayer(timeState);
  // // 月
  // const moonLayer = new MoonLayer(timeState);
  // // 流れ星レイヤー
  // const meteorLayer = new MeteorLayer();
  // 
  // 
  // 
  // // WebSocketを受け取る
  new WebSocketReciever(horse, timeState);
  
  // animation(backgroundLayer, backgroundCurtainLayer, backStarsLayer, moonLayer, meteorLayer, meteor);
};
