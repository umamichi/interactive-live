import io from 'socket.io-client';
import KeyReciever from './utils/KeyReciever';
// import MidiReciever from './utils/MidiReciever';

window.onload = () => {
  const socket = io();
  
  if (location.hash === '#datemaki') {
    document.getElementById('buttonWrapper').style.display = 'block';
  }
  
  // websocketで強制的にリロードする
  socket.on('RELOAD', () => {
    console.log('リロード受け取り');
    location.reload();
  });
  
  // config.json取得
  getConfigJson();
  
  // イベント定義
  setEvents();
  
  // Midiを受け取る
  // new MidiReciever([backMode, showConstellation, startNight, proceedMode]);

  // key bind
  new KeyReciever([backMode, startNight, proceedMode]);

  
  /**
   * config.json取得
   */
  function getConfigJson() {
    const req = new XMLHttpRequest();		  // XMLHttpRequest オブジェクトを生成する
    req.onreadystatechange = () => {		  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
      if (req.readyState === 4 && req.status === 200) { // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
        // 取得した JSON ファイルの中身を表示
        const config = req.responseText;
        window.modeName = JSON.parse(config).MODE_NAME;
        document.getElementById('mode-name').innerText = config;
      }
    };
    req.open('GET', '/server/config.json', false); // HTTPメソッドとアクセスするサーバーのURLを指定
    req.send(null);
  }
  
  /**
   * イベント定義
   */
  function setEvents() {
    // password
    document.getElementById('passwordSubmit').addEventListener('click', () => {
      if ( document.getElementById('password').value === 'datemaki') {
        document.getElementById('buttonWrapper').style.display = 'block';
      }
    });
    
    document.getElementById('mode-before-live').addEventListener('click', () => {
      changeMode('BEFORE_LIVE');
    });
    document.getElementById('mode-interactive-meteor-tutorial').addEventListener('click', () => {
      changeMode('INTERACTIVE_METEOR_TUTORIAL');
    });
    document.getElementById('mode-interactive-meteor').addEventListener('click', () => {
      changeMode('INTERACTIVE_METEOR');
    });
    document.getElementById('mode-after-live').addEventListener('click', () => {
      changeMode('AFTER_LIVE');
    });
    
    // MIDI API用
    document.getElementById('midi-A').addEventListener('click', () => {
      backMode();
    });
    document.getElementById('midi-D').addEventListener('click', () => {
      proceedMode();
    });
    // document.getElementById('midi-B').addEventListener('click', () => {
    //   // 星座を表示する
    //   showConstellation();
    // });
    document.getElementById('midi-C').addEventListener('click', () => {
      // 夜になる
      startNight();
    });
  }


  /**
   * モードを戻す
   */
  function backMode() {
    switch (window.modeName) {
      case 'BEFORE_LIVE':
        break;
      case 'INTERACTIVE_METEOR_TUTORIAL':
        changeMode('BEFORE_LIVE');
        break;
      case 'INTERACTIVE_METEOR':
        changeMode('INTERACTIVE_METEOR_TUTORIAL');
        break;
      case 'AFTER_LIVE':
        changeMode('INTERACTIVE_METEOR');
        break;
      default:
        break;
    }
  }
  /**
   * モードを進める
   */
  function proceedMode() {
    switch (window.modeName) {
      case 'BEFORE_LIVE':
        changeMode('INTERACTIVE_METEOR_TUTORIAL');
        break;
      case 'INTERACTIVE_METEOR_TUTORIAL':
        changeMode('INTERACTIVE_METEOR');
        break;
      case 'INTERACTIVE_METEOR':
        changeMode('AFTER_LIVE');
        break;
      case 'AFTER_LIVE':
        break;
      default:
        break;
    }
  }
  
  /**
   * 星座を表示する
   */
  // function showConstellation() {
  //   if (window.modeName === 'INTERACTIVE_METEOR_TUTORIAL') {
  //     socket.emit('SHOW_CONSTELLATION');
  //     return;
  //   }
  //   if (window.modeName === 'INTERACTIVE_METEOR') {
  //     socket.emit('SHOW_LAST_MESSAGE');
  //     return;
  //   }
  // }
  /**
   * 夜になる
   */
  function startNight() {
    if (window.modeName !== 'INTERACTIVE_METEOR') {
      return;
    }
    console.log('start!');
    socket.emit('START_NIGHT');
  }
  
  /**
   * モードを変える
   */
  function changeMode(MODE_NAME) {
    socket.emit('CHANGE_MODE', {
      MODE_NAME
    });
  }
};
