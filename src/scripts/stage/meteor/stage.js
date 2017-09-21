import animation from './animation';
import TimeState from './TimeState';
import BackgroundLayer from './layer/BackgroundLayer';
import BackgroundCurtainLayer from './layer/BackgroundCurtainLayer';
import MoonLayer from './layer/MoonLayer';
import BackStarsLayer from './layer/BackStarsLayer';
import MeteorLayer from './layer/MeteorLayer';
import Meteor from './Meteor';
import Constellation from './Constellation';
import WebSocketReciever from '../WebSocketReciever';
import redirect from '../../utils/redirect';

// モードによって画面を切り替える
redirect(true);

window.onload = () => {
  // 星座を表示する
  const constellation = new Constellation();
  
  // 時間管理
  const timeState = new TimeState(constellation);
  
  // 流れ星を管理する
  const meteor = new Meteor();
  
  // 背景レイヤー
  const backgroundLayer = new BackgroundLayer();
  // 背景の上に乗せるレイヤー
  const backgroundCurtainLayer = new BackgroundCurtainLayer(timeState);
  // 背景の星レイヤー
  const backStarsLayer = new BackStarsLayer(timeState);
  // 月
  const moonLayer = new MoonLayer(timeState);
  // 流れ星レイヤー
  const meteorLayer = new MeteorLayer();
  

  
  // WebSocketを受け取る
  new WebSocketReciever(meteor, timeState);
  
  animation(backgroundLayer, backgroundCurtainLayer, backStarsLayer, moonLayer, meteorLayer, meteor);
};
