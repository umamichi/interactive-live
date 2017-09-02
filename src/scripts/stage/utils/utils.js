const utils = {
  /**
   * ランダムな小数数値を得る（引数で範囲指定できる）
   * @param number min 最小値
   * @param number max 最大値
   */
  getRandomFlowNum(min, max) {
    return Math.random() * (max - min) + min;
  },
  /**
   * ランダムな数値を得る（引数で範囲指定できる）
   * @param number min 最小値
   * @param number max 最大値
   */
  getRandomNum(min, max) {
    return ~~(this.getRandomFlowNum(min, max));
  }
};

export default utils;
