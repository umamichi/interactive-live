import C from '../constantsStage';


/**
 * 流れ星レイヤーを管理するクラス
 */
export default class MeteorLayer {
  constructor() {
    this.meteorCanvas = document.createElement('canvas');
    this.init();
  }
  
  init() {
    this.meteorCanvas.width  = C.WIDTH;
    this.meteorCanvas.height = C.HEIGHT;
    this.meteorCanvas = this.meteorCanvas;
    this.meteorContext = this.meteorCanvas.getContext('2d');
  }
  
  
  /**
   * 流れ星を流す
   * @param  {object} star  星の情報（座標等）
   */
  shootingStar(star) {
    // やってることは楕円を描画するだけ
    const option = {
      x: star.x,
      y: star.slope * star.x + star.intercept
    };
    this.meteorContext.beginPath();
    this.meteorContext.ellipse(option.x, option.y, star.width, star.height, star.rotation, 0, 2 * Math.PI);
    this.meteorContext.fillStyle = star.color;
    this.meteorContext.fill();
  }

  
  
}
