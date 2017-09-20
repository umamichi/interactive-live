import C from '../constantsStage';
import utils from '../../utils/utils';
import _ from 'lodash';

/**
 * 背景レイヤーを管理するクラス
 */
export default class BackStarsLayer {
  constructor(timeState) {
    this.timeState = timeState;
    this.backStarsCanvas = document.createElement('canvas');
    this.backStarsContext = this.backStarsCanvas.getContext('2d');
    
    this.stars = []; // 星の配列
    this.init();
  }
  
  init() {
    // const self = this;
    this.createBackground(); // 背景を生成
    this.createStars(); // 星を生成
  }
  
  
  /**
   * 背景を生成
   */
  createBackground() {
    this.backStarsCanvas.width  = C.WIDTH;
    this.backStarsCanvas.height = C.HEIGHT;
  }
  
  /**
   * 星を生成
   */
  createStars() {
    // console.log('this', this);
    
    for ( let i = 0; i < 1500; i++ ) {  // 1500個
      const width = utils.getRandomFlowNum(0.3, 2.2);
      const options = {
        x: utils.getRandomFlowNum(0, C.WIDTH),
        y: utils.getRandomFlowNum(0, C.HEIGHT - C.BOTTOM_PADDING),
        width,
        height: utils.getRandomFlowNum(0.3, 1.8), 
        rotate: utils.getRandomNum(0, 360) / 360 * Math.PI,
        color: C.STAR_COLORS[i % 3],
        brightness: width > 1.8 && utils.getRandomFlowNum(0, 1) > 0.8 // 1.8より大きい星だけたまに輝く
      };
      this.stars.push(options);
    }
  }
  
  /**
   * 背景の星をキラキラさせる
   */
  animation() {
    this.backStarsContext.clearRect(0, 0, C.WIDTH, C.HEIGHT);
    _.forEach(this.stars, (star) => {
      const width = star.brightness ? star.width * utils.getRandomFlowNum(0.3, 1.5) : star.width * this.timeState.time / 100;
      
      // console.log('star', star);
      this.backStarsContext.beginPath();
      this.backStarsContext.ellipse(
        star.x,
        star.y,
        width,
        star.height, 
        star.rotate, 
        0, 2 * Math.PI);
      this.backStarsContext.fillStyle = star.color;
      this.backStarsContext.fill();
    });
  }
  
}
