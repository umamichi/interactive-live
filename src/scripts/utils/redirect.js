import io from 'socket.io-client';
const socket = io();

/**
 * Config.jsonの値を取得して、リダイレクト処理をする
 */
export default function redirect(isStage = false) {
  const stagePath = isStage ? '/stage' : ''; 
  
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
        redirectPage(JSON.parse(config));
      }
    };
    req.open('GET', '/server/config.json', false); // HTTPメソッドとアクセスするサーバーのURLを指定
    req.send(null);	
  }
  
  /**
   * リダイレクトする
   */
  function redirectPage(_config) {
    const modeName = _config.MODE_NAME;
    let nextUrl;
    switch (modeName) {
      case 'BEFORE_LIVE':
        nextUrl = `${stagePath}/beforeLive.html`;
        break;
      case 'AFTER_LIVE':
        nextUrl = `${stagePath}/afterLive.html`;
        break;
      case 'INTERACTIVE_METEOR_TUTORIAL':
        nextUrl = `${stagePath}/index.html#tutorial`;
        break;
      case 'INTERACTIVE_METEOR':
        // productionをつけないと下のif文が動かないからつけとく
        nextUrl = `${stagePath}/index.html#production`;
        break;
      default:
        nextUrl = `${stagePath}/index.html`;
    }
    
    // URLが同じであれば遷移しない
    if ( location.href.indexOf(nextUrl) !== -1 ) {
      // console.log('location.href.indexOf(nextUrl)', location.href.indexOf(nextUrl));
      console.log('URLが同じ,遷移しない');
      return;
    }
    location.href = nextUrl;
  }
}
