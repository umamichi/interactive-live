/**
* MIDIを受け取るクラス
*/
export default class MidiReciever {
  constructor(events) {
    this.events = events; // 4つイベントをセットしておく
    this.init();
  }
  
  init() {
    //MIDIデバイスへアクセスする
    navigator.requestMIDIAccess().then(this.success.bind(this), this.failure);
  }
  
  //通信成功時
  success(midiAccess) {
    console.log('MIDI READY', midiAccess);
    this.setInputs(midiAccess);
  }
  
  //通信失敗時
  failure(msg) {
    console.error(`MIDI FAILED -  ${msg}`);
  }
  
  //MIDIAccessオブジェクトのInputsを取得してイベントに対して関数を渡す
  setInputs(midiAccess) {
    const inputs = midiAccess.inputs;
    inputs.forEach((key) => {
      console.log('key.name: ', key.name);
      // console.log("[" + key.state + "] manufacturer:" + key.manufacturer + " / name:" + key.name + " / port:" + port);
      
      key.onmidimessage = this.onMidiMessage.bind(this);
    });
  }
  
  //MIDIデバイスからメッセージが送られる時に実行
  onMidiMessage(event) {
    console.log(event.data[1]);
    const num = event.data[1];
    // 指定のイベントを実行
    this.events[num]();
  }
}
