const History = {
  index: -1,
  frames: [],
  /**
   * 이전 frame 이 있는지 확인
   * @return {boolean}
   */
  hasBefore() {
    return Boolean(this.frames[this.index - 1])
  },
  /**
   * 다음 frame 이 있는지 확인
   * @return {boolean}
   */
  hasNext() {
    return Boolean(this.frames[this.index + 1])
  },
  /**
   * 인덱스를 다음으로 이동한다
   */
  next() {
    this.index++
  },
  /**
   * 인덱스를 이전으로 이동한다
   */
  before() {
    this.index--
  },
  /**
   * 현재 프레임을 반환한다
   * @return {Object} frame
   */
  get() {
    return this.frames[this.index]
  },
  /**
   * 프레임을 추가 한다
   * @param {Object} frame
   */
  addFrame(frame) {
    this.frames.push(frame)
    this.next()
  },
}

export default History
