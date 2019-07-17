/**
 * Front-end 해야할 리스트
 * 1. [v] 메모 생성
 *   - 우클릭 생성
 * 2. [ ] 메모 좌표 이동
 *   -  마우스 드롭이 끝난 시점에서 옮겨지면 된다.
 * 3. [ ] 메모 순서 변경
 * 4. [ ] 메모 사이즈 변경
 * 5. [ ] 메모 저장
 *   - localstorage
 * 6. [ ] 메모 삭제
 */

let hasMemo = false
let moveMemo = false
const WRAPPER = document.querySelector('#wrap')
const TYPE = 2
const postIt = []

class Memo {
  constructor(id, x, y) {
    /**
     * constructor에서 관리 할 목록은 무엇 일까?
     * - ID값
     * - 좌표
     * - 크기
     */

    this.id = id
    this.x = x
    this.y = y
  }

  make() {
    let memoEl = document.createElement('div')
    /**
     * innerHTML로 디비전 구성을 하는게 옳을까?
     */
    memoEl.innerHTML = `
    <div class="wrap_memo" id="${this.id}" style="top:${this.y}px;left:${this.x}px">
      <textarea placeholder="텍스트를 입력하세요"></textarea>
      <span class="btn_close">
        <svg version="1.1" viewBox="0 0 212.982 212.982" xml:space="preserve" ><g id="Close"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312 c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312 l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937 c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" /></g></svg>
      </span>
    </div>
    `

    WRAPPER.appendChild(memoEl)
  }

  move(e) {
    this.x = e.pageX
    this.y = e.pageY
    e.target.style['top'] = `${this.y}px`
    e.target.style['left'] = `${this.x}px`
    // console.log(e.target.style, this.x)
  }
}

export default Memo

document.addEventListener('mousedown', function(e) {
  /**
   * 흠, random 말고 좋은 방법이 있읋까?
   */
  const random = Math.round(Math.random() * 100000)
  if (e.button === TYPE) {
    postIt.push(
      new Memo(
        random,
        e.layerX,
        e.layerY
      )
    )

    /**
     * 코드가 보기 힘든 것 같다,
     * 생성을 하고 내가 선택한 애가 맞는지 체크 할 수 있는 방법이 뭐가 있을까?
     */
    postIt.filter(key => key.id === random)[0].make()
  } else {
    moveMemo = true
  }
})

document.addEventListener('mousemove', function(e) {
  hasMemo = e.target.classList.contains('wrap_memo')
  if (hasMemo && moveMemo) {

    postIt.filter(key => key.id === Number(e.target.id))[0].move(e)
    
    // postIt.move(e.pageX, e.pageY)
  }
})

document.addEventListener('mouseup', function() {
  moveMemo = false
})