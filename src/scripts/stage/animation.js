import C from './constantsStage';
import _ from 'lodash';
// import utils from './utils/utils';

export default function animation(
  backgroundLayer, backgroundCurtainLayer, backStarsLayer, moonLayer, meteorLayer, meteor
) {
  const canvas = document.getElementById('mainCanvas');
  const context = canvas.getContext('2d');
  
  loop(); //アニメーションを実行

  function loop() {
    requestAnimationFrame(loop);
    
    moonLayer.animation();
    
    // 残像を残す処理、全体を半透明のレイヤーで塗る
    meteorLayer.meteorContext.save();
    meteorLayer.meteorContext.globalCompositeOperation = 'destination-out';
    meteorLayer.meteorContext.globalAlpha = 0.3;
    meteorLayer.meteorContext.fillStyle = '#000';
    meteorLayer.meteorContext.fillRect(0, 0, C.WIDTH, C.HEIGHT);
    meteorLayer.meteorContext.restore();
    
    // レイヤーを本体canvasに合成
    context.drawImage(backgroundLayer.backgroundCanvas, 0, 0);
    context.drawImage(backgroundCurtainLayer.backgroundCurtainCanvas, 0, 0);
    context.drawImage(backStarsLayer.backStarsCanvas, 0, 0);
    context.drawImage(moonLayer.backgroundCanvas, 0, 0);
    context.drawImage(meteorLayer.meteorCanvas, 0, 0);
    
    // ブルームーンが夜になる
    backgroundCurtainLayer.animation();
    
    // 背景の星をキラキラさせる
    backStarsLayer.animation();
    
    // 星の数だけ繰り返す
    _.forEach(meteor.stars, (star) => {
      // 画面外
      if ( !star ) {
        return;
      }
      
      // 消失したかどうか判定する
      const isDisapper = star.speed < 0 ? (star.x < star.end.x) : (star.x > star.end.x);
      // console.log('isDisapper', isDisapper);
      if (isDisapper) {
        console.log('disapper');
        //ここでクリア
        star.isDelete = true;
        _.remove(meteor.stars, (deleteStar) => {
          return deleteStar.isDelete;
        });
        return;
      }
      
      //ループ毎にx座標を変更
      star.movingX += Math.abs(star.speed);
      star.progressRate = star.movingX / Math.abs(star.deltaX) * 100;
      
      // 40〜60%のとき加速
      if (star.progressRate > 40 && star.progressRate < 60) {
        star.x += star.speed * 2;
      } else {
        star.x += star.speed;
      }
  
      // if (star.progressRate > 60) {
      //   star.height *= 0.7;
      //   star.width *= 0.8;
      // }
    
      //描画処理
      meteorLayer.shootingStar(star, meteorLayer.meteorContext);
    });
  }
}


