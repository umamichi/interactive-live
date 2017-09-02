import io from 'socket.io-client';
import redirect from '../utils/redirect';
const socket = io();

redirect(); // 共通の初期処理

window.onload = () => {
  document.getElementById('comment__send').addEventListener('click', () => {
    const text = document.getElementById('comment__textarea').value;
    if (text === '') {
      return;
    }
    socket.emit('ENQUATE_SEND', text);
    document.getElementById('comment').innerHTML = '<p class="comment__afterSend">ありがとう🎸<br>送信しました♪</p>'; 
  });
};
