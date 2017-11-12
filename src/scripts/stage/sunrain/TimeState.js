/**
 * 時間を管理する
 */
export default class TimeState {  
  // アクションスタート
  // 雷鳴らす、雷にする
  start() {
    // 雷スタート
    if (this.isStart) {
      return;
    }
    console.log('rainbow🌈');
    this.isStart = true;
    
    document.getElementById('wrapper').style.display = 'block';
    
    // new Audio('../assets/sounds/thunder.mp3').play();
    // document.getElementById('lightning').classList.add('show');
  }
}
