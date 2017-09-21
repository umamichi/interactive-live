// import utils from '../utils/utils';
import moment from 'moment';
import $ from 'jquery';

/**
 * 馬を管理するクラス
 */
export default class Horse {
  constructor() {
    this.init();
    this.$horseAreaInner = $('#horseArea__inner');
    console.log(this.$horseAreaInner);
    this.runningTimeSecond = 4 + 1;
  }
  
  init() {
    // Enterで流す
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.shooting({ color: '#fff' });
      }
    });
  }
  
  /**
   * 流す
   */
  shooting(_data = { color: '#f0f0f0' }) {
    console.log('shooting!', _data);
    
    const id = moment().format('YYYYMMDDHHmmSSS');
    // const config = {
    //   id,
    //   color: '#f00',
    //   isRun: false,
    //   isDelete: false
    // };
    
    $('#horseArea__inner').append(`<img class="horse" src="../assets/images/horse.png" id="${id}">`);
    
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
