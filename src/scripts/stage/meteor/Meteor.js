import C from './constantsStage';
import utils from '../utils/utils';
import moment from 'moment';

/**
 * 流れ星を管理するクラス
 */
export default class Meteor {
  constructor() {
    this.stars = [];
    this.init();
  }
  
  init() {
    // Enterで流す
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.shooting({ color: '#fff' });
      }
    });
  }
  
  /**
   * 流す
   */
  shooting(_data = { color: '#fff' }) {
    console.log('shooting!', _data);

    // websocketで受け取ったデータ
    const data = {
      width: 20,
      height: 4, //2
      start: {
        x: utils.getRandomNum(0, C.WIDTH),
      },
      end: {
        x: utils.getRandomNum(0, C.WIDTH),
      },
      id: moment().format('YYYYMMDDHHmmSSS'),
      color: _data.color,
    };
    const options = this.createStarOptions(data);

    // console.log(options);
    this.stars.push(options);
  }
  
  
  /**
   * 流れ星のデータを計算する
   * @param  {object} data websocketで受け取ったデータ
   */
  createStarOptions(data) {
    const result = data;
    // グラフの式を y = ax + b とするとき (a = slope, b = intercept)
    result.slope = utils.getRandomFlowNum(-0.8, -1.2); // 右上から左下への角度
    result.intercept = utils.getRandomFlowNum(C.HEIGHT * 0.3, C.HEIGHT * 2.3); // 切片
    
    result.start.x =  (-result.intercept / result.slope) * utils.getRandomFlowNum(0.8, 1); // 画面内に収まるXの値は -(切片/傾き)
    result.end.x = result.start.x * utils.getRandomFlowNum(0, 0.6); // 開始x座標の0〜0.6倍
    result.x = result.start.x; // 開始点
    
    result.deltaX = result.end.x - result.start.x;
    result.deltaY = result.slope * result.deltaX;
    
    result.movingX = 0; // 0〜deltaXまで移動する
    result.rotation = Math.atan(result.slope); // 楕円を進行方向に傾ける
    result.distance = Math.sqrt(Math.pow(result.deltaX, 2) + Math.pow(result.deltaY, 2)); // 斜方向の移動距離
    result.speed = C.SPEED * (result.deltaX / result.distance); // スピード
    result.progressRate = 0; // 0〜100%
    
    return result;
  }
}
