import C from '../constantsStage';


/**
 * 月を管理するクラス
 */
export default class MoonLayer {
  constructor(timeState) {
    this.timeState = timeState;
    this.backgroundCanvas = document.createElement('canvas');
    this.backgroundCanvas.width  = C.WIDTH;
    this.backgroundCanvas.height = C.HEIGHT;
    this.backgroundContext = this.backgroundCanvas.getContext('2d');
    this.moon = new Image();
    this.loaded = false;
    this.init();
    
    
    this.maps = {
      x: 1400,
      y: 200,
      width: 170,
      height: 193
    };
  }
  
  init() {
    this.loadImage(); // 画像ロード
  }
  
  /**
   * 月が移動する
   */
  animation() {
    if (!this.loaded) {
      return;
    }
    
    const timeRange = (() => {
      if (this.timeState.time > 58) { // 58%を超えてから月出現
        return (this.timeState.time - 58) / (100 - 58) * 100;
      }
      return 0;
    })();
    
    this.backgroundContext.clearRect(0, 0, C.WIDTH, C.HEIGHT); // clear
    this.backgroundContext.drawImage(
      this.moon, 
      1400 + (300 - 300 * timeRange / 100), // 月のx軸の位置
      250 + (700 - 700 * timeRange / 100), // 月のy軸の位置
      this.maps.width, 
      this.maps.height);
  }
  
  
  /**
   * 画像をロード
   */
  loadImage() {
    this.moon.src = '../assets/images/moon.png';
    this.moon.onload = () => {
      this.loaded = true;
    };
  }
}
