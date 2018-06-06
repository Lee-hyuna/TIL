# Stack, Queue

## 자료구조

Data 의 집합. 정의된 규칙으로 인해 나열되고 자료에 대한 처리를 효율적으로 수행할 수 있도록자료를 구분하여 표현한 것.

자료를 효율적으로 저장하고, 관리하기 때문에 잘 선택된 자료구조는 실행시간을 단축시켜주거나 메모리 용량의 절약이 가능

---

## 스택

자료의 입력과 출력을 한 곳으로 제한한 자료구조

LIFO (Last in First Out)

**Stack**

가장 늦게들어온 것이 가장먼저 나간다는 뜻

![](./images/image01.png)

```js
var third = function() {
  console.log("third");
};
var second = function() {
  third();
  console.log("second");
};
var first = function() {
  second();
  console.log("first");
};
first();
third();
```

> log 의 결과값이 third > second > first > third 순으로 찍히게 된다.

---

**Linked List Stack**

스택을 사용해야할 때 주의해야할 점은 **UnderFlow**와 **OverFlow**.

**UnderFlow:** top 이 이미 초기값을 가르키고 있어 스택에 아무것도 없는상태에서 pop() 연산을 시도할때 발생.

**OverFlow:** top 이 스택의 최대값을 가르키고 있는 상태에서 push() 연산을 시도할때 발생.

배열처럼 스택의 용량을 정해두고 데이터를 쌓아야만 함.

스택의 용량을 초과할 경우 위에 있는 데이터를 빼내야만 다른 데이터를 넣을 수 있음.

![](./images/image02.gif)

**장점**

* 크기에 제한을 가지고 있지 않다.
* 중간 삽입, 삭제가 array 에 비하여 쉽다.
* 삽입, 삭제에 대한 비용이 적다. O(1)
* 때문에 c,c++ 등에서 자료구조를 구현할때 linked list 를 주로 활용한다.

**단점**

* 탐색에 있어서 단방향이다.
* 탐색에 대하여 비용이 크다. O(n)
* 때문에 삽입,삭제 에 있어서 이전 노드의 주소(객체)의 정보를 가지고 있어야 한다.
* 이중 연결 리스트가 방안이 될 수 있다.

```js
function Stack() {
  //스택의 요소가 저장되는 배열
  this.dataStore = [];

  //스택의 위치
  this.top = -1;

  //함수정의
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.length = length;
}

//스택에 요소를 추가
function push(element) {
  this.top = this.top + 1;
  this.dataStore[this.top] = element;
}

//스택의 꼭대기의 요소를 반환한다.
//단 top이 감소하는것은 아니다.
function peek() {
  return this.dataStore[this.top];
}

//스택 최상층의 요소를 반환한다.
function pop() {
  //Stack underflow
  if (this.top <= -1) {
    console.log("Stack underflow!!!");
    return;
  } else {
    var popped = this.dataStore[this.top];
    //top을 1 감소시킨다.
    this.top = this.top - 1;
    return popped;
  }
}

//스택의 전체 요소를 삭제한다.
function clear() {
  this.top = -1;
}

//스택에 저장된 데이터 수
function length() {
  return this.top + 1;
}

//스택 클래스 구현 테스트

//스택 객체 생성
var stackObj = new Stack();

//스택에 데이터 삽입
stackObj.push("David");
stackObj.push("Raymond");
stackObj.push("Bryan");

//스택의 크기 반환
console.log("length: " + stackObj.length());

//스택 최상위 요소 출력
console.log(stackObj.peek());

//스택에서 최상위 요소 꺼내기
var popped = stackObj.pop();
console.log("The popped element is: " + popped);

//스택의 최상위 요소 출력
console.log(stackObj.peek());

//스택에 데이터 삽입
stackObj.push("Cynthia");

//스택의 최상위 요소 출력
console.log(stackObj.peek());

//스택 비우기
stackObj.clear();

//스택의 크기 반환
console.log("length: " + stackObj.length());

//스택의 최상위 요소를 출력.
//이때 스택은 모두 비워졌으므로 undefined가 출력된다.
console.log(stackObj.peek());

//스택에 데이터 삽입
stackObj.push("Clayton");

//스택의 최상위 요소 출력
console.log(stackObj.peek());
```

---

## 큐

자료의 입력과 출력을 한 쪽 끝으로 제한한 자료구조

FIFO (First in First Out)

주로 tree 의 깊이 우선탐색, sliding window 등 주로 순서 처리의 시스템에 쓰인다.

![](./images/image03.png)

**단점**

* 큐에 빈 메모리가 남아 있어도 꽉 차있는 것으로 판단할 수 있음. rear 가 배열의 끝에 도달했을 경우

> 개선된 원형 큐가 나옴

![](./images/image05.png)

**원형 큐의 단점**

* 메모리 공간은 잘 활용하나 배열로 구현되어 있기 때문에 큐의 크기가 제한이 되는 단점이 존재

> 링크드 리스트로 큐가 나옴

링크드 리스트로 구현한 큐는 큐의 제한이 없고 삽입, 삭제가 편리하다

```js
function Queue() {
  this.dataStore = []; // 요소 저장공간
  this.enqueue = enqueue; // 요소추가
  this.dequeue = dequeue; // 요소꺼내기
  this.front = front; // 큐의 맨 앞에 있는 요소 확인
  this.back = back; // 큐의 맨 뒤에 있는 요소 확인
  this.toString = toString; // 모든 요소 출력
  this.empty = empty; // 큐가 비었는지 안비었는지 알려줌
}

function enqueue(element) {
  //여기서 push함수는 Array의 내장함수이다.
  //요소를 배열 맨 뒤에 삽입.
  this.dataStore.push(element);
}

function dequeue() {
  //shift는 Array의 내장함수이다.
  //배열내의 맨 앞 요소를 반환하고 배열내에서 삭제한다.
  return this.dataStore.shift();
}

//큐의 맨 젓번째 요소 반환
function front() {
  //배열의 첫번째 요소 반환
  return this.dataStore[0];
}

//큐의 맨 끝 요소 반환
function back() {
  //배열의 맨 끝 요소 반환
  return this.dataStore[this.dataStore.length - 1];
}

//큐에 저장된 요소 모두 출력
function toString() {
  var retStr = "";
  for (var i = 0; i < this.dataStore.length; i++) {
    retStr = retStr + this.dataStore[i] + "\n";
  }
  return retStr;
}

//큐 비우기
function empty() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}

//테스트 프로그램

var queueObject = new Queue();

//Queue에 요소 삽입
queueObject.enqueue("Meredith");
queueObject.enqueue("Cynthia");
queueObject.enqueue("Jennifer");

//First In First Out - 먼저들어간게 먼저나오는 구조로 인하여
//Meredith가 먼저 나온다.
console.log("Dequeued elemet: " + queueObject.dequeue());

//Queue의 모든 요소 출력
console.log("Element of Queue");
console.log(queueObject.toString());

//큐의 맨 앞의 요소 출력
console.log("Front of queue : " + queueObject.front());

//큐의 맨 뒤 요소 출력
console.log("Back of queue : " + queueObject.back());
```
