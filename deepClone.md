# 참조 복사와 값 복사 (얕은 복사와 깊은 복사)

자바스크립트에서 =을 사용하여 객체를 복사하면 값을 복사하는게 아닌, 그 값의 위치만 참조하게 된다.

## 1. Number, String, Boolean의 값 복사
자바스크립트는 기본 값 (Number, String, Boolean)을 복사할 때 그 값을 완전복사를 함.
따라서 =을 이용하여 값을 쉽게 복사할 수 있다.

```js
var origin = 1000;
var transfer = origin;

origin = 2000;
console.log(origin); // 2000
console.log(transfer); // 1000
```

변수 `origin`에 값이 1000이 들어가고, 변수 `transfer`에 1000이란 값이 복사되었고 `origin`에 2000을 재 할당되어도 `transfer`의 값은 1000으로 완전 독립적인 상태가 된다.

고로 이 상태에서 `origin = 2000`으로 재할당 했을 때 `origin`의 값만 2000이된다.
이렇게 두개의 변수가 완전히 독립하는 것을 '값 복사' 또는 '깊은 복사'라고 한다.



## 2. 객체의 참조 복사
객체에 변수를 저장하면 실제 값을 저장하는 것이 아니고 객체를 메모리 어딘가에 만들고, 그 객체를 참조하게 된다.
따라서 객체의 경우 = 를 이용하여 복사하면 참조 복사만 가능하다.

```js
var arr = ['a', 'b', 'c'];
var shallow = arr;
shallow[0] = 'd';

console.log(arr) // ['d, 'b', 'c'];
```
변수 `shallow`에 `arr`배열을 대입하였고, 첫번째 인덱스의 값을 변경했더니 arr에도 변화가 일어났다.
이 것이 같은 메모리 위치를 참조를 한 것이라 볼 수 있다.

변수는 모두 메모리에 저장이 된다. 그리고 대입을 하면 변수의 이름은 저장된 메모리의 주소를 가르키게 됨.
값은 하나인데 변수는 여러가지 일 수 있는데 이 것을 shallow copy '얕은복사'라고 한다.



## 3. 객체의 깊은 복사
따라서 이 얕은 복사를 방지하기 위해 메모리에 객체를 두개 만들어 따로 운영하게 하면 된다.

```js
function deepClone(obj) {
  var result = {};
  if(typeof obj === 'object' && obj !== null) {
    for(var i in obj) {
      if(obj.hasOwnProperty(i)) {
        result[i] = deepClone(obj[i]);
      }
    }
  }else {
    result = obj;
  }

  return result
}

var obj = { a: 1, b: 2, c: { d: null, e: 'f' } };
var obj2 = deepClone(obj);
obj2.a = 3;
console.log(obj.a); // 1
```

if문으로 object검사를 거치고, for문을 이용해 obj안의 key값을 탐색한다. 

이후 if문으로 `obj.hasOwnProperty(key)`를 다시 탐색해 주는 이유는 prototype에 있는 상속된 객체의 속성도 반복되기 때문에 자기 속성만 반복되도록 제한을 해둔 것임.