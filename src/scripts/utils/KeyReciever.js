/**
* キーボードの信号を受け取るクラス
*/
export default class KeyReciever {
  constructor(events) {
    this.events = events; // 4つイベントをセットしておく
    this.setEvents();
  }
  
  setEvents() {
    document.addEventListener('keydown', (e) => {
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case 37:
          this.events[0]();
          break;
        case 39:
          this.events[2]();
          break;
        case 32: // space
          this.events[1]();
          break;
        default:
          return;
      }
    });
  }
}
