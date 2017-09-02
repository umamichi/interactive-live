// import C from './constantsStage';

/**
 * 時間を管理する
 */
export default class TimeState {
  constructor(constellation) {
    this.constellation = constellation;
    this.time = 0;
    this.$cloudDom = document.getElementById('cloud');
  }
  
  /**
   * 雲のopacityをupdate
   */
  updateCloudDomStyle() {
    this.$cloudDom.style.filter = `brightness(${(100 - this.time / 2) / 100}`;
  }

  /**
   * 時間経過開始
   */
  start() {
    const second = 60 * 4 + 12;
    const speed = (100 * 0.1) / second;
    // const second = 120;
    const timer = setInterval(() => {
      // ここで切り捨てると、値が急激に小さくなる場合があるので、切り捨てない方がいい
      // 塵も積もれば山となるで、全体的な値が小さくなる
      this.time += speed;
      // this.time =  Math.floor((this.time + speed) * 100 ) / 100;
      // this.time += 0.5;
      
      this.updateCloudDomStyle();
      
      if (this.time > 80 && !this.constellation.isShowAllConstellations) {
        this.constellation.showAllConstellations();
      }
      
      if (this.time >= 100) {
        clearInterval(timer);
      }
      console.log(this.time);
    }, 100);
  }
}
