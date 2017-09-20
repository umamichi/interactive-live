import C from '../constantsStage';


/**
 * 背景レイヤーを管理するクラス
 */
export default class BackgroundLayer {
  constructor() {
    this.backgroundCanvas = document.createElement('canvas');
    this.backgroundContext = this.backgroundCanvas.getContext('2d');
    this.init();
  }
  
  init() {
    // const self = this;
    this.createBackground(); // 背景を生成
  }
  
  
  /**
   * 背景を生成
   */
  createBackground() {
    this.backgroundCanvas.width  = C.WIDTH;
    this.backgroundCanvas.height = C.HEIGHT;
    
    const gradation = new Image();
    gradation.src = '../assets/images/gradation.jpg';
    gradation.onload = () => {
      this.backgroundContext.drawImage(gradation, 0, 0, 1920, 1080);
    };
    
    // this.backgroundContext.filter = 'hue-rotate(180deg)';
  }
}
