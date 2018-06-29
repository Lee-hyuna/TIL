# 패턴(Patterns)

> 넓은 의미의 패턴은 "반복되는 사건이나 객체의 주제로 물건을 만드는 데 사용할 수 있는 틀이나 모형이 될 수 있는 것"을 말한다. 소프트웨어 개발에서는 일반적인 문제를 해결하는 해결책을 가리킨다. 바로 복사해서 붙여넣을 수 있는 코드를 말하는 것이 아니라, 모범적인 관행, 쓰임새에 맞게 추상화된 원리, 어떤 범주의 문제 해결을 위한 템플릿에 가깝다.

#### 패턴의 종류

- 디자인패턴
- 코딩패턴
- 안티패턴

> #### Javascript 안티 패턴을 보완하는 방법
> - 유지보수 가능한 코드 작성
> - 전역 변수 (Global Variables) 사용 최소화
> - var 선언은 필수!
> - 단일 var 패턴 (Single Var Pattern)
> - 암묵적 타입캐스팅 피하기
> - 반복 구문에서 length 값은 캐시 (Cache)
> - for ~ in 반복문에서 hasOwnProperty() 사용 : 상속 받은 것을 제외하고 자신의 것만 검색하기 위해
> - eval() 함수 사용 금지! : 보안 issue
> - parseInt() 숫자 변환 시, 기수 설정 : `parseInt("123", 10)`

#### 유지보수 가능한 코드 작성

> #### 일관된 코딩 규칙 준수를 통해 유지보수 가능한 코드를 작성해야 한다.

- 읽기 쉽다.
- 일관적이다.
- 예측 가능하다.
- 한 사람이 작성한 것처럼 보인다.
- 문서화되어 있다. : jsdoc

#### 전역 변수 사용 최소화

> #### 전역 변수 사용을 최소화한다는 것은 전역을 오염시키지 않는 것을 말한다. 최대한 전역과 구분되는 영역(Scope)에서 코드를 작성하는 습관을 들일 필요가 있다.

- 네임스페이스(Namespace) 패턴 : 조금 번잡; YUI(Yahoo User Interface) 패턴
- **IIFE(Immediately-Invoced Function Expression) 활용 : 모듈 패턴**

##### Namespace 패턴 : 객체에 종속시켜 범위를 정해주는 패턴(비추)

```javascript
//전역 함수
function checkType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

// Namespace 패턴
// 객체에 종속시켜 범위를 정해주는 패턴
const FAST_CAMPUS = {};
FAST_CAMPUS.checkType = function (data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

// 재귀
FAST_CAMPUS.checkType = function checkType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

checkType // Reference Error
YUI.checkType // "array"

// 동결
Object.freeze(YUI); // delete 불가능. 동결상태
delete YUI.checkType // false
```

##### IIFE 패턴(모듈 [노출] 패턴) : 클로저 활용

```javascript
var moduleMaker = function () {
  // 모듈 정의
  var module = {};
  var checkType = function (data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};
var module = {
  'checkType' : checkType
};
  // 정의된 모듈 내보내기
  return module;
};

var moduleInsatance = moduleMaker();
checkType; // Reference Error
moduleInsatance.checkType(9); // Number

// IIFE(즉시 실행 함수, 자가 실행 함수) 패턴 : "누군가 나의 이름을 불러주지 않아도 나는 실행되네"
function () {} // 함수 값
function(){}.toString(); // Error
(function(){}).toString(); // 함수를 문자열로 반환

(function(){console.log('execute')}()); // IIFE - 더글라스 크록포드 권고 방식 
(function(){console.log('execute')}(); // IIFE
!function(){console.log('excute')}();
+function(){console.log('excute')}();

// IIFE를 활용해서 모듈 패턴 사용
// moduleMaker() 실행 X
// IIFE 패턴을 사용하여 모듈을 정의/내보내기 => 모듈 패턴
var dom = (function(global){
  'use strict';
  
  var document = global.document, // 스코프 체이닝 방지
      toString = Object.prototype.toString; // 스코프 체이닝 방지
  // [Private] 외부에서 접근 할 수 없는 코드
  var query, queryAll, checkType, isString;
  checkType = function(data) {
    return toString.call(data).slice(8, -1).toLowerCase();
  };
  isString = function(data) {
    return checkType(data) === 'string';
  };

  queryAll = function(selector){ 
      if(!isString(selector)){ return console.error('CSS 선택자 문자로 전달 요망'); }
      return document.querySelectorAll(selector);
    };

  query = function(selector){
    return queryAll(selector)[0];
  };

  // [Public] 외부에서 접근 할 수 없는 코드
  return {
    'q' : query,
    'qa': queryAll
  };

}(window));

dom.checkType(); // 접근 불가 - Private
```

> +구글에서 IIFE 검색해서 공부해보기

#### 전역 변수의 문제점

Javascript 애플리케이션, 웹 사이트 내 모든 코드 사이에서 공유되는 문제. 애플리케이션 내 다른 영역에서 목적이 다른 동일한 이름의 전역 변수가 존재할 경우 코드 충돌. 외부 코드를 가져와 삽입할 경우에도 문제 발생 가능. 고로 스크립트 간 충돌을 방지하기 위함으로 전역 변수 사용을 최소한 줄여야 함.

- 서드파티 Javascript 라이브러리
- 광고 제휴 업체 스크립트

#### var 선언은 필수

암묵적 전역의 또 다른 안 좋은 패턴은 var 선언에 연쇄적 할당을 적용하는 경우.

```javascript
function increase(value) {
    // count는 암묵적 전역에 따라 전역 객체의 속성이 된다.
    // var num = ( count = 1 );
    var num = count = 1;
    return ++num - count++ + value;
}

increase(10);

console.log( count ); // 2
```

#### 참고 : 메서드 빌려쓰기 패턴

특정 객체의 메서드를 다른 객체가 빌려쓰는 것.

> [MDN : forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)

forEach()가 사용되는 경우는 보통 `집합`의 형태를 가진다. NodeList도 forEach() 메서드를 가지고 있지만, 현재 MS 계열은 지원하고 있지 않다.

```javascript
dir(Function.prototype); // 브라우저 콘솔에서 Function의 prototype 리스트 확인
```

```javascript
var fly = function() {console.log(this.kind + '날다');};

var bird = {
  'kind' : 'small bird',
  'fly' : fly
};

var human = {
  'kind' : 'Giant',
  'walk' : function() {console.log(this.kind + '걷다');};
}

bird.fly(); // small bird 날다
human.fly(); // TypeError. 정의되지 않은 함수

// this를 human 객체로 변경
// bird 객체의 능력(메서드)을 human이 빌려썼다.
bird.fly.call(human); // Giant 날다
```

> ##### apply()와 call() 메서드는 모두 소유자인 함수를 호출하면서 this를 넘긴다. 결과적으로 함수 내부에서 this 객체의 값을 바꾸는 것과 마찬가지이다. bird.fly.call(human)는 함수의 컨텍스트를 human으로 설정하므로 “Giant 날다”를 출력한다. call()이나 apply()를 써서 스코프를 바꾸면 객체마다 메서드를 등록하지 않아도 된다는 장점이 있다.

- apply() : 매개변수로 소유자 함수에 넘길 this와 매개변수 배열을 받는다. 두 번째 매개변수는 Array의 인스턴스일 수도 있고 arguments 객체일 수도 있다.

- call() : apply()와 유사하지만 매개변수를 전달하는 방식이 다르다. this가 첫 번째 매개변수인 점은 같지만, call()을 사용할 때는 반드시 매개변수를 각각 나열해야 한다.

- call(), apply()는 this 컨텍스트 교체 후 바로 실행된다. 반면 bind()는 this 컨텍스트 교체 후 실행 시점을 조작할 수 있다.

```javascript
human.walk.call(bird); // small bird 걷다.
human.walk.bind(bird); // Function을 반환한다.
var bird_walk = human.walk.bind(bird); 
bird_walk(); // small bird 걷다.
```

- bind()는 이벤트 리스너에 많이 사용한다. 사용자가 이벤트의 트리거를 당기는 순간 이벤트가 실행되게 만들 수 있다.

```javascript
//실습
window.assignArgs.call(document.body, 1, 3, 6);
window.assignArgs.apply(document.body, [1, 3, 6]);
window.assignArgs.bind(document.body, 1, 3, 6);
```

```javascript
// Array.prototype.forEach 능력을 다른 객체(집합)가 빌려쓰는 것이 가능하다. 
// NodeList가 Array.prototype.forEach를 빌려쓰게 할 수 있음.

// arguments : 유사 배열
function assignArgs() {
  console.log('this :', this);
  console.log('arguments :', arguments);
  console.log('arguments.forEach :', arguments.forEach);
  //Array 메서드 빌려쓰기 패턴 활용
  Array.prototype.forEach.call(arguments, function(arg, i){
    console.log('i :', i);
    console.log('arg :', arg);
  });
}
```

```javascript
//forEach 동작 방식
["a", "b", "c"].forEach(function(item, index)){
  console.log('item': item);
  console.log('index': index);
}
```

> ##### forEach 지원되지 않는 브라우저는 helper 함수로 forEach를 만들면 됨

```javascript
// forEach.js
var y9 = (function(global, y9){
  'use strict';
  // y9 모듈 개발 코드
  y9.forEach = function(data, callback) {
    // 유효성 검사
    if( !data || !data.length) {/*Error 처리*/}
    if( !callback || typeof callback !== 'function' ) {/*Error 처리*/}
    // 집합일 경우
    for(var i = 0, l=data.length; i<l; i++) {
      callback.call(data, data[i], i);
    }
  };
})(this, (this.y9 = this.y9 || {}));
```

```javascript
//  내장 객체를 사용자 확장
// 위험하다! 공부목적
if( !Array.prototype.each ) {
  Array.prototype.each = function(callback) {
    if( !callback || typeof callback !== 'function' ){}
    for(var i = 0, l=this.length; i< l; i++) {
      callback.call(this, this[i, i, this]);
    }
  };
}
```

> #### call 메서드 사용해서 a 요소 스타일 바꾸기

```html
<section>
    <h1 class="a11y-hidden">section title</h1>
    <div>
      <a href="#" class="target_link">anchor element</a>
    </div>
</section>
```

```javascript
var target_link = document.querySelector('.target_link');
var assignStyles = function(styles) {
  for(var style in styles) {
    if(styles.hasOwnProperty(style)){
      this.style[style] = styles[style];
    }
  }
};

target_link.onclick = function (e) {
  e.preventDefault();
  assignStyles.call(this, {
    'color' : 'lime',
    'font-size' : '22px'
  });
};
```

#### eval 함수 사용 금지

`eval()` 함수는 일련의 문자열을 받아 코드를 실행시킨다. 이는 보안 상에 문제를 야기하므로 사용하지 않는 것이 좋다. 누군가 악의적으로 전달한 문자열을 실행시킬 수도 있기 때문이다.

```javascript
var book = {
    'reading' : function() { console.log('reading'); },
    'buying'  : function() { console.log('buying'); },
    'selling' : function() { console.log('selling'); }
};

// 안 좋은 패턴: eval() 함수 사용
function assignBook(method) {
    if ( eval('book.' + method) ) {
        eval('book.' + method + '()');
    }
}
assignBook('selling');

// 좋은 패턴: 객체 대괄호 표기법
function assignBook(method) {
    if ( book[method] ) {
        book[method]();
    }
}

assignBook('selling');
```

- 뿐만 아니라 setInterval(), setTimeout() 역시 eval()과 마찬가지로 전달 받은 문자열을 코드로 실행시킬 수 있기에 사용에 주의가 요구된다.

```javascript
// 안 좋은 패턴: 첫번째 인자로 문자열(코드)을 전달한 경우
setInterval('book.selling()', 2200);

// 좋은 패턴: 객체의 속성(참조)을 전달한 경우
setInterval(book.selling, 2200);
```

## 정리

### 모듈 별로 개발하는 것이 좋다. 그렇기 위해서 필요한 개념들.
* 클로저 개념 - 함수나 객체는 자기 상위 영역에 접근할수 있다.
* 즉시실행함수패턴(모듈패턴) - 전역과는 구분되는 지역에 코드를 묶기위해 - > 충돌을 방지하기 위해

### .call(), .apply(), .bind()
```javascript
Function.prototype // 함수의 프로토타입 객체가 가지고 있는 함수 속성 3가지.

{
  'call': function() {},
  'apply': function() {},
  'bind': function() {},
}
```

> - Module 패턴 + 클로저 활용 + **IIFE 패턴** 
>   - 모듈을 만들어서 개발하는 습관을 가져야 한다. 
>   - 전역을 오염시키지 말아라.
> - Function.prototype의 `call, apply, bind` 메서드
>   - call, apply, bind의 차이점
>   - bind는 ES5부터 지원 : ES5 shim 이용 or 직접 만들어서 사용
> - forEach(), map

---
