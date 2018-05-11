# Training JS #33
`typeof bar === 'object`를 사용했을 때 함정이 무엇인가요?

### Answer:
`typeof bar === "object"`를 확인할 수 있는 방법 중 `null`또한 object로 간주한다.
그래서 console.log에 false가 아닌 **true**로 찍히게 된다

```js
var bar = null;
console.log(typeof bar === "object");  // logs true!
```

이럴 경우, null이 떨어졌을 때 false 예외처리를 하나 더 추가 해야하데 그 방법은 아래와 같다.

```js
console.log((bar !== null) && (typeof bar === "object"));  // logs false
```

꼭 주의해야할 두가지가 있다:

첫번째는, bar가 함수인 경우 false를 반환한다. 해당 function을 true로 반환하려면 다음과 같이 해야한다 :

```js
console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function")));
```
막대가 배열(예:varbar=[];)인 경우 위의 솔루션은 true로 반환됩니다. 대부분의 경우 어레이는 개체이기 때문에 이 방법을 사용하는 것이 좋지만 어레이에 대해서도 거짓으로 표시하려는 상황에서는 위의 솔루션을 다음과 같이 수정할 수 있습니다.


두번째는, bar가 배열(e.g., if var bar = [];)인 경우 true를 반환한다. 대부분의 경우 array는 개체이기 때문에
이 방법을 사용 하는 것이 좋지만, array에 대해 false로 반환하려면 다음과 같이 수정할 수 있다 :

```js
console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]"));
```

하지만, 숫자, 배열 및 함수에는 false를 반환하지만 개체에는 true를 반환하는 다른 방법이 있다.

```js
console.log((bar !== null) && (bar.constructor === Object));
```

제이쿼리:

```js
console.log((bar !== null) && (typeof bar === "object") && (! $.isArray(bar)));
```

ES5 array 케이스를 다임과 같이 만든다:

```js
console.log(Array.isArray(bar));
```