# ECMAScript 2015(ES6) - part 1

## let/const VS. var
* let과 const는 block scope를 가진다. (내부에 지역을 만든다.)
* 따라서 호이스팅 되지 않는다.

```javascript
{
    let a = 0;
    const b = 0;
    console.log(a); // 0
}
console.log(b); // Reference Error
```

## String Additions 

* string.includes()  
* string.startWith() 
* string.endWith()   
* string.repeat()    

## Array Additions  

* array.find()
* array.includes() 
* array.fill()     
* array.keys()
* array.values()   
* array.entries()


## Template Strings

### 이스케이프(Escape) 문자열 처리 해결

```javascript
let o = {
      'cover'  : `003.Zayn&TaylorSwift-IDon'tWannaLiveForever(FiftyShadesDarker).jpg`,
      'source' : `003.Zayn&TaylorSwift-IDon'tWannaLiveForever(FiftyShadesDarker).mp3`,
      'alt'    : `I Don't Wanna Live Forever (Fifty Shades Darker)`
};
```

### 보간법(Interpolation) 활용 가능 (Like Sass)
* HTML 템플릿(Template) 작성에 탁월!
* Vue JS 프레임워크에서 유용하게 활용하게 됨.


```javascript
let unknown = `${}t`
let o = {
      'cover'  : `003.Zayn&TaylorSwift-IDon\'tWannaLiveForever(FiftyShadesDarker).jpg`,
      'source' : `003.Zayn&TaylorSwift-IDon\'tWannaLiveForever(FiftyShadesDarker).mp3`,
      'alt'    : `I Don't Wanna Live Forever (Fifty Shades Darker)`
};
```

## Arrow Function
* JavaScript 함수 내부에서 this 참조는 실행 시에 동적으로 변경된다.
* 이로 인해 의도치 않은 실수가 발생할 수 있는데 화살표 함수를 사용하면 this 참조가
* 문맥으로 유지되기 때문에 실수를 미연에 방지할 수 있다.
* 변수에 참조하는 표현식일때만 사용할수 있다.

```javascript
  // ES6 Arrow Function 사용

  AudioCtrl.prototype.create = function() {
    // 생성
    var audio = document.createElement('audio');
    // 옵션 변수
    var options = this.options;
    // 경로 변수
    var source = options.src;
    // 검사
    AudioCtrl.validate(typeof source !== 'string' || !source.trim(), '전달된 음원 경로는 문자열이 아니거나, 공백 문자입니다.');
    // 설정
    audio.setAttribute('src', source);
    // 생성/재생 가능 이후 시점
    audio.oncanplay = ()=> {
      if( typeof options.created === 'function' ) {
           options.created.call(this, audio); 
           }
    }
    // audio 객체 반환
    return audio;
  };
```

```javascript
  // ES5 
  
  AudioCtrl.prototype.create = function() {
    var _this = this;
    // 생성
    var audio = document.createElement('audio');
    // 옵션 변수
    var options = this.options;
    // 경로 변수
    var source = options.src;
    // 검사
    AudioCtrl.validate(typeof source !== 'string' || !source.trim(), '전달된 음원 경로는 문자열이 아니거나, 공백 문자입니다.');
    // 설정
    audio.setAttribute('src', source);
    // 생성/재생 가능 이후 시점
    audio.oncanplay = function() {
      if( typeof options.created === 'function' ) {
           options.created.call(_this, audio); 
           }
    }
    // audio 객체 반환
    return audio;
  };
```

## Default Parameters
* 함수 매개변수 초기 값을 설정할 수 있다. (Like Sass)
```javascript
function sum(a, b = 9) {
    return a + b;
}

sum(10); // 19
sum(10, 2); // 12
```

* 함수 매개변수 값을 외부의 함수 결과 값으로 처리할 수도 있다.
```javascript
function assignDiscount(count, discount=0.4) {
    return cost - (cost * discount);
}

assignDiscount(1000);
assignDiscount(10, 0.3);

function defaultDiscount() {
    return 0.45;
}

function assignDiscount2(cost, )

```

## Rest or Spread Parameters

### Rest Parameters

```javascript
// Rest parameter는 맨 마지막에 던져져야한다.
function sum(o, ...numbers) {
    console.log(o, numbers);
}

sum({a: 1, c: 9}, 2, 3, 6, 4, 2, [9, 10]);

```

```javascript
// Array.prototype.reduce
// [].reduce(function(이전값,현재값){},초기값);
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
function sum(o, ...numbers) {
    return numbers.reduce((s,c)=>s + c);
}

sum(2, 3, 5, 610, 21, -102); // 540
```

### Spread Parameters

```javascript
function process (...steps) {
    console.log('steps[0]');
    console.log('steps[1]');
}

var lecture = ['study css', 'study es6'];

process(...lecture);
```

```javascript
let a1 = [3, 5, 8], a2 = [55, 88];
// 기존 방식
// a1.splice(2, 0, a2[0], a2[88];)
// spread 방식으로 인자를 전달하면 배열 데이터의 원소를 각각 풀어서 전달한다.
a1.splice(2, 0, ...a2); // a1 = [3, 5, 55, 88, 8]
```

## Object Enhancements

```javascript
let getPerson = ()=> {
  let name = 'Hoon';
  let job  = 'Instructor';
  return {
    name,
    job,
    greeting(you) {
      let message = `Hello, ${you}.`;
      message += `My Name is ${this.name} and My Job is ${this.job}`;
      return message;
    }
  };
}
// console.log( getPerson().name );
// console.log( getPerson().greeting('Hey Min') );
```

```javascript
let age = 10, name = "열", job = "열열";

let json_data = {
  name, age, job,
  getName() {},
  setAge() {},
  jobChange() {}
}
```


## Class(클래스) & Inheritance(상속)

### Class(클래스)

* class
* constructor
* static
```javascript
// < e.g) 1: 생성자 함수 ➤ 클래스 문법 활용 >
// 생성자 함수
function User(name, email) {
  this.name = name;
  this.email = email;
}
// static method
User.register = function(name, email) {
  return new User(name, email);
};
// instace method 
User.prototype.changeEmail = function(new_mail) {
  this.email = new_mail;
};
```
```javascript
// 클래스 문법으로 변경
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    static register(name, email) {
        return new User(name, email);
    }
    changeEmail(new_mail) { 
        this.email = new_mail;
    }
}
```

### 상속(Inheritance)
```javascript
class Animal {
    constructor(legs = 4, wings = 0) {
        this.legs = legs;
        this.wings = wings;
    }
    eat() {}
    sleep() {}
    run() {}
}

class Duck extends Animal {
    constructor(type) {
        super(2, 2); // this를 가르킨다.
        this.type = type;
    }
    fly() {}
}

// class Dog extends Animal {}
// class Elephant extends Animal {}
```

### ES5 -> ES6
```javascript

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    static register(name, email) {
        return new User(name, email);
    }
    changeEmail(new_mail) { 
        this.email = new_mail;
    }
}

let user_list = [];
user_list.push( User.register('a', 'a@acon.com') );
user_list.push( User.register('v', 'v@acon.com') );
user_list.push( User.register('j', 'j@acon.com') );

// ES5
user_list.find( function(user) {
  return user.email === 'dondong@a.mail';
});
// ES6, Step 1
user_list.find(user)=>{ return user.email === 'dondong@a.mail'; };
// ES6, Step 2
user_list.find(user=>user.email === 'dondong@a.mail'); // return value
user_list.findIndex(user=>user.isAdmin); // return index

// filter
var user_not_admin = user_list.filter(user=>!user.idAdmin);

// Array.find() -> 하나의 인자를 반환 
// [Reference - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find]

// Array.filter() -> 배열로 인자를 반환 
// [Reference - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter]

```

* get (getter)
* set (setter)
* extends
* super
* new WeakMap()

## Getter, Setter 함수
```javascript
class Employee {

    constructor(name) {
        this._name = name;
    }

    get name() {
      if(this._name) {
        return this._name.toUpperCase() + ' 양';
      } else {
        return undefined;
      }
    }

    set name(newName) {
      if (newName == this._name) {
        console.log('이미 같은 이름을 쓰고 있습니다.');
      } else if (newName) {
        this._name = newName;
      } else {
        return false;
      }
    }
}

var emp = new Employee("솔지");

// 내부적으로 get 메소드를 활용
if (emp.name) {
  console.log(emp.name);  // 솔지 양
}

// 내부적으로 setter를 활용
emp.name = "EXID 솔지";
console.log(emp.name);  // EXID 솔지 양

```

## new WeakMap()

```javascript
let _nickname = new WeakMap();

class Duck extends Animal {
  constructor(type) {
    super(2, 2);
    // Public
    this.type = type;
    // WeakMap 사용하여 비공개 멤버 등록
    _nickname.set(this, null);
  }
  // getter
  get nickname() {
    return _nickname.get(this) || undefined;
  }
  // setter
  set nickname(new_name) {
    if ( new_name === _nickname.get(this) ) {
      console.info('이미 별명이 같습니다.');
    } else if (new_name) {
      _nickname.set(this, new_name);
    }
  }
  fly() {}
}

let gold_duck = new Duck('황금 알을 낳는 오리');

gold_duck.nickname; // undefined
gold_duck.nickname = '황금 둥이';
```

## Destructuring(파괴)
```javascript
// < e.g) 1: 블록 스코프 내에서 디스트럭쳐링 활용 >
let product = {
  name           : 'TV',
  maker          : 'LG',
  features       : [ 'Time Recoding', 'Sharing Screen', 'Speech Recognition' ],
  productionYear : 2017
};

{
  let name           = product.name;
  let maker          = product.maker;
  let features       = product.features;
  let productionYear = product.productionYear;
}
```