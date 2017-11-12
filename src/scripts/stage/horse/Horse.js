// import utils from '../utils/utils';
import moment from 'moment';
import $ from 'jquery';

/**
 * 馬を管理するクラス
 */
export default class Horse {
  constructor() {
    this.$horseAreaInner = $('#horseArea__inner');
    this.runningTimeSecond = 4 + 1;
    this.init();
  }

  init() {
    // Enterで流す
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.shooting();
      }
    });
  }

  /**
   * 流す
   */
  shooting(_data = { color: '#FFFFFF' }) {
    console.log('shooting!', _data);

    const id = moment().format('YYYYMMDDHHmmSSS');
    const color = _data.color.replace(/#/, '');

    // 馬の高さ生成
    const bottom = `${Math.floor(Math.random() * 35)}%`;
    $('#horseArea__inner').append(`<img class="horse" src="../assets/images/horse${color}.png" id="${id}" style="bottom: ${bottom}">`);

    // 走り出す
    setTimeout(() => {
      $(`#${id}`).addClass('horse--run');
    }, 100);

    // 走り終わったら馬消す
    setTimeout(() => {
      $(`#${id}`).remove();
    }, this.runningTimeSecond * 1000);
  }
}
