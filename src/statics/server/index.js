const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const fs = require('fs');
const moment = require('moment');
const configJsonPath = __dirname + '/config.json';
const sendEnquete = require('./send-enquete');

// console.log('dirname', dirname);

// サーバーのファイルにはアクセスできないようにする
app.use((req, res, next) => {
  const originalUrl = res.req.originalUrl;
  if (originalUrl === '/server/index.js' || originalUrl === '/server/send-enquete.js') {
    res.send(400);
  }
  next();
});

// dist ディレクトリを使う

// distの絶対パスを取得する
// console.log('__dirname', __dirname);
var dirname = '';
for (var i = 0; i < __dirname.split('/').length - 1; i++) {
  dirname += `${__dirname.split('/')[i]}/`;
}
app.use(express.static(dirname)); 

// app.use(express.static(__dirname + '/dist')); // dist ディレクトリを使う


// websocket
io.on('connection', (socket) => {
  // 流れ星
  socket.on('shooting', (data) => {
    console.log(`message: ${data}`);
    io.emit('SHOOTING', data);
  });
  
  // モードを切り替える
  socket.on('CHANGE_MODE', (data) => {
    console.log(data);
    // config.jsonの内容を取得する
    const config = JSON.parse(fs.readFileSync(configJsonPath, 'utf8'));
    // console.log(config);
    config.MODE_NAME = data.MODE_NAME;
    // config.json を編集する
    fs.writeFile(configJsonPath, JSON.stringify(config), (err) => {
      if (err) {
        console.log('error', err);
      }
    });
    
    // スマホ側にリロードの指示を送る
    io.emit('RELOAD');
  });
  
  
  // 星座を表示
  socket.on('SHOW_CONSTELLATION', () => {
    io.emit('SHOW_CONSTELLATION');
    console.log('SHOW_CONSTELLATION');
  });
  socket.on('SHOW_LAST_MESSAGE', () => {
    io.emit('SHOW_LAST_MESSAGE');
    console.log('SHOW_LAST_MESSAGE');
  });
  // 夜になる
  socket.on('START_NIGHT', () => {
    io.emit('START_NIGHT');
    console.log('START_NIGHT');
  });
  
  // アンケートが送信されたとき
  socket.on('ENQUATE_SEND', (text) => {
    console.log('アンケート受信:', text);
    // logとしてファイルを保存
    fs.writeFile(`logs/after-live-mail/${moment().format('YYYY-MM-DD-HH-mm-ss')}.txt`, text);
    // メールを送信
    sendEnquete(text);
  });
});

http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});
