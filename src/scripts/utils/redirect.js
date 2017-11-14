import io from 'socket.io-client';
const socket = io();

/**
 * Config.jsonの値を取得して、リダイレクト処理をする
 */
export default function redirect(isStage = false) {
  // websocketで強制的にリロードする
  socket.on('RELOAD', () => {
    location.reload();
  });
  
  // config.jsonの値を取得して指定のページにリダイレクト
  getConfigJson();
  
  /**
   * getConfigJson
   */
  function getConfigJson() {
    let config;
    const req = new XMLHttpRequest();		  // XMLHttpRequest オブジェクトを生成する
    req.onreadystatechange = () => {		  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
      if (req.readyState === 4 && req.status === 200) { // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
        // 取得した JSON ファイルの中身を表示
        config = req.responseText;
        let nextUrl;
        if (isStage) {
          nextUrl = getStagePath(JSON.parse(config));
        } else {
          nextUrl = getControllerPath(JSON.parse(config));
        }
        changePage(nextUrl);
      }
    };
    req.open('GET', '/server/config.json', false); // HTTPメソッドとアクセスするサーバーのURLを指定
    req.send(null);	
  }
  
  
  /**
   * リダイレクトする（ステージ）
   */
  function getStagePath(_config) {
    const modeName = _config.MODE_NAME;
    let nextUrl;
    switch (modeName) {
      case 'BEFORE_LIVE':
        nextUrl = '/stage/beforeLive.html';
        break;
      case 'WAIT':
        nextUrl = '/stage/wait.html';
        break;
      case 'INTERACTIVE_METEOR_TUTORIAL':
        nextUrl = '/stage/meteor.html#tutorial';
        break;
      case 'INTERACTIVE_METEOR':
        nextUrl = '/stage/meteor.html#production';
        break;
      case 'BEFORE_HORSE':
        nextUrl = '/stage/beforeHorse.html';
        break;
      case 'INTERACTIVE_HORSE':
        nextUrl = '/stage/horse.html';
        break;
      case 'INTERACTIVE_SUNRAIN':
        nextUrl = '/stage/sunrain.html';
        break;
      case 'AFTER_LIVE':
        nextUrl = '/stage/afterLive.html';
        break;
      default:
        nextUrl = '/stage/index.html';
    }
    return nextUrl;
  }
  
  /**
   * リダイレクトする（コントローラー）
   */
  function getControllerPath(_config) {
    const modeName = _config.MODE_NAME;
    let nextUrl;
    switch (modeName) {
      case 'BEFORE_LIVE':
        nextUrl = '/beforeLive.html';
        break;
      case 'WAIT':
        nextUrl = '/beforeLive.html';
        break;
      case 'INTERACTIVE_METEOR_TUTORIAL':
        nextUrl = '/meteor.html#tutorial';
        break;
      case 'INTERACTIVE_METEOR':
        // productionをつけないと下のif文が動かないからつけとく
        nextUrl = '/meteor.html#production';
        break;
      case 'BEFORE_HORSE':
        nextUrl = '/beforeHorse.html';
        break;
      case 'INTERACTIVE_HORSE':
        // productionをつけないと下のif文が動かないからつけとく
        nextUrl = '/horse.html';
        break;
      case 'INTERACTIVE_SUNRAIN':
        // productionをつけないと下のif文が動かないからつけとく
        nextUrl = '/sunrain.html';
        break;
      case 'AFTER_LIVE':
        nextUrl = '/afterLive.html';
        break;
      default:
        nextUrl = '/index.html';
    }
    return nextUrl;
  }
  
  function changePage(nextUrl) {
    // URLが同じであれば遷移しない
    if ( location.href.indexOf(nextUrl) !== -1 ) {
      // console.log('location.href.indexOf(nextUrl)', location.href.indexOf(nextUrl));
      console.log('URLが同じ,遷移しない');
      return;
    }
    location.href = nextUrl;
  }
}
