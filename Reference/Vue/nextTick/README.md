# this.$nextTick

프로젝트 작업을 하다가 간헐적으로 DOM을 못찾는 상황이 있었다.
모든 처리가 비동기로 처리 되다 보니 UI가 갱신되기도 전에 DOM을 탐색하는 상황이 생겨서 에러가 발생하게 되는데, 이 경우 nextTick이라는 좋은 메서드가 있길래 참고해보았다.

```js
created() {
    this.$nextTick(() => {
        documnet.getElementById('test').style.backgroundColor = 'tan' 
    }) 
}
```

`nextTick`의 콜백을 통해 DOM조작을 할 경우 데이터 갱신 후 해당 함수를 실행하게 됩니다.