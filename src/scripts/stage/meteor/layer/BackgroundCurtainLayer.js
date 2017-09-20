import C from '../constantsStage';


/**
 * 背景レイヤーを管理するクラス
 */
export default class BackgroundCurtainLayer {
  constructor(timeState) {
    this.timeState = timeState;
    this.backgroundCurtainCanvas = document.createElement('canvas');
    this.backgroundCurtainContext = this.backgroundCurtainCanvas.getContext('2d');
    this.backgroundCurtainCanvas.width  = C.WIDTH;
    this.backgroundCurtainCanvas.height = C.HEIGHT;
  }
  
  /**
   * だんだん暗くする
   */
  animation() {
    this.backgroundCurtainContext.fillStyle = `rgba(0, 0, 0, ${this.timeState.time / 100})`;
    this.backgroundCurtainContext.clearRect(0, 0, C.WIDTH, C.HEIGHT);
    this.backgroundCurtainContext.fillRect(0, 0, C.WIDTH, C.HEIGHT);
  }
  
}
