/**
 * 星座を管理するクラス
 */
export default class Constellation {
  constructor() {
    this.init();
    this.showedNum = 0;
    this.isShowAllConstellations = false;
  }

  init() {
    this.targets = {
      $pegasus: document.getElementById('constellation--pegasus'),
      $guitar: document.getElementById('constellation--guitar'),
      $lastMessage: document.getElementById('constellation--lastMessage')
    };
  }

  /**
   * 順番に表示
   */
  show() {
    console.log('show');
    
    switch (this.showedNum) {
      case 0:
        this.targets.$pegasus.classList.add('showLine');
        this.showedNum++;
        break;
      case 1:
        this.targets.$pegasus.classList.add('showIllust');
        this.showedNum++;
        break;
      case 2:
        this.targets.$guitar.classList.add('showLine');
        this.showedNum++;
        break;
      case 3:
        this.targets.$guitar.classList.add('showIllust');
        this.showedNum++;
        break;
      default:
        console.log('全部終わり');
        this.isFinished = true;
        return;
    }
  }
  
  /**
   * すべての星座表示
   */
  showAllConstellations() {
    this.isShowAllConstellations = true;
    
    this.show();
    setTimeout(() => {
      this.show();
      setTimeout(() => {
        this.show();
        setTimeout(() => {
          this.show();
        }, 2000);
      }, 3000);
    }, 2000);
  }

  /**
   * すべてを隠す
   */
  hideAll() {
    this.showedNum = 0;
    this.targets.$pegasus.classList.remove('showLine');
    this.targets.$pegasus.classList.remove('showIllust');
    this.targets.$guitar.classList.remove('showLine');
    this.targets.$guitar.classList.remove('showIllust');
  }
  
  
  // Thank you を表示
  showLastMessage() {
    setTimeout(() => {
      this.targets.$lastMessage.classList.add('show');
    }, 3000);
  }
}
