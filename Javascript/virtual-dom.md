# Virtual DOM

## DOM의 good point
  - Cross-platform, cross-browser을 지원한다.
  - web page 구조를 쉽게 표현한다.
  - 사용하기 쉽고, 컨트롤 할 수 있는 API가 제공된다.

## DOM의 Bad point
  - DOM manipulation에서 성능 문제가 있다. >> 느림
    - element
    - attribute
    - events
    - style

## Virtual DOM !!!
사실 DOM manipulation이 느린것이 아니고, DOM의 rendering calculation이 느린 것.
돔 조작을 빠르게 하는 것이 아닌, DOM 조작에 발생하는 rendering을 최소화 하는 것이 맞다.

변경할 사항을 **가상의** 위치에서 처리하고, 실제 DOM의 조작을 최소화 하는 것이 Virtual DOM의 핵심.

> 그래서 가상돔이 뭔데?
- 무엇이든 될 수 있다.
  - JSON, XML, Function, TEXT, annotation, etc....

### Virtual DOM JSON으로 이해하기

- JSON으로 DOM 표현하기

  **DOM**
  ```html
  <ul class="list">
    <li>ITEM 1</li>
    <li>ITEM 2</li>
  </ul>
  ```

  **JSON DOM**
  ```js
  {
    type: 'ul',
    props: {
      'class': 'list'
    },
    children: {
      { 'type': 'li', props: {}, children: ['item1'] },
      { 'type': 'li', props: {}, children: ['item2'] }
    }
  }
  ```

- JSON DOM을 Update하기

  **DOM**
  ```html
  <ul class="list">
    <li>ITEM 1</li>
    <li>ITEM 2</li>
  </ul>
  ```

  **JSON DOM**
  ```js
  {
    type: 'ul',
    props: {
      'class': 'list'
    },
    children: {
      { 'type': 'li', props: {}, children: ['item1'] },
      { 'type': 'li', props: {}, children: ['item2'] },
      { 'type': 'li', props: {}, children: ['item3'] }
    }
  }
  ```
  - 실제 DOM 조작 없이, JSON에 대한 조작으로 DOM을 Update
  - 여러 JSON으로 조작을 한 이후 최종적으로만 DOM manpulation

## Virtual DOM의 문제점
- Virtual table을 생성해야함
  - in-memory 사용의 증가
- DIFF의 필요성
- 개발자가 Virtual DOM의 개념을 이해 못하고 구현 시, 큰 성능 향상이 없을 수 있음

<br><br>

# 실제 구현

## REAL DOM > JSON

**DOM**
```html
  <ul class="list">
    <li>ITEM 1</li>
    <li>ITEM 2</li>
  </ul>
  ```
**JSON DOM**
```js
{
  type: 'ul',
  props: {
    'class': 'list'
  },
  children: {
    { 'type': 'li', props: {}, children: ['item1'] },
    { 'type': 'li', props: {}, children: ['item2'] }
  }
}
```

**JSON 표현**
```js
{ type: '...', props: { ... }, children: { ... }}
```

<br><br>

## JSON > Function

**JSON 표현**
```js
{ type: '...', props: { ... }, children: { ... }}
```

**Function**
```js
function h(type, props, ..children) {
  return { type, props, children }
}
```

**사용**
```js
h('ul', { class: 'list' },
  h('li', {}, 'item1'),
  h('li', {}, 'item2'),
)
```

## JSX 표현

**JSX 표현**
```js
/** AJAX h **/
const a =(
  <ul className="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
)
```

**JSX가 Transpiled 되면**
```js
const a =(
  h('ul', { className: 'list' },
    h('li', {}, 'item1'),
    h('li', {}, 'item2')
  )
)
```

## VurtualDOM to RealDOM update 전체 함수 버전
```js
function h(type, props, ..children) {
  return { type, props, children }
}

function createElement(node) {
  if(typeof node === 'string') {
    return document.createTextNode(node)
  }

  const $el = document.createElement(node.type)
  node.children.map(createdElement).forEach($el.appendChild.bind($el))

  return $el
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if(!oldNode) {
    $parent.appendChild(
      createdElement(newNode)
    )
  }else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    )
  }else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    )
  }else if (newNode.type) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length

    for(let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}
```

## 정리
- DOM manipulation을 최소화 하는 방법을 사용하는것이 좋다.
- Virtual DOM의 원리를 알고 쓰는 것이 좋다.

## 참고
- [How to write your own Virtual DOM](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)