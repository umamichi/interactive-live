// import utils from '../utils/utils';
import moment from 'moment';
import Vue from 'vue/dist/vue.js';
import _ from 'lodash';

/**
 * 馬を管理するクラス
 */
export default class Horse {
  constructor() {
    this.init();
    this.runningTimeSecond = 4 + 1;
    
    this.vue = new Vue({
      el: '#horseArea__inner',
      data: {
        horses: [
          // {
          //   id: 0,
          //   color: '#f00',
          //   isRun: false
          // }
        ]
      },
      created() {
      },
      methods: {
      }
    });
  }
  
  init() {
    // Enterで流す
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.shooting({ color: '#fff' });
      }
    });
    
    setInterval(this.deleteOldHorse.bind(this), 1000);
  }
  
  /**
   * 流す
   */
  shooting(_data = { color: '#f0f0f0' }) {
    console.log('shooting!', _data);
    
    const id = moment().format('YYYYMMDDHHmmSSS');
    const config = {
      id,
      color: '#f00',
      isRun: false,
      isDelete: false
    };
    
    console.log(config);
    
    this.vue.$data.horses.push(config);
    
    // 走り出す
    setTimeout(() => {
      _.forEach(this.vue.$data.horses, (horse) => {
        if (horse.id === id) {
          horse.isRun = true;
        }
      });
    }, 100);
    
    // 走り終わったら馬消す
    setTimeout(() => {
      _.forEach(this.vue.$data.horses, (horse) => {
        if (horse.id === id) {
          horse.isDelete = true;
          // this.vue.$data.horses.splice(index, 1);
          // return false;
        }
        // return true;
      });
      // console.log('this.vue.$data.horses', this.vue.horses);
    }, this.runningTimeSecond * 1000);
    
    
    // document.getElementById('horse').classList.add('horse--run');
    // 
    // this.$horseAreaInner.append('<img class="horse" id="horse" src="../assets/images/horse.png">');
  }
  
  
  deleteOldHorse() {
    console.log('check');
    const horses = _.cloneDeep(this.vue.$data.horses);
    _.remove(horses, (deleteHorse) => {
      if (deleteHorse.isDelete) {
        console.log('delete!');
      }
      return deleteHorse.isDelete;
    });
    this.vue.$data.horses = horses;
  }
}
