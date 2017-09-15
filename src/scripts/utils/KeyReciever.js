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
      switch (e.keyCode) {
        case 37:
          this.events[0];
          break;
        case 39:
          this.events[2];
          break;
        case 16:
          this.events[1];
          break;
        default:
          return;
      }
    });
  }
}
