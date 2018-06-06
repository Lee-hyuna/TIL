# Stack, Queue

## 자료구조
Data의 집합. 정의된 규칙으로 인해 나열되고 자료에 대한 처리를 효율적으로 수행할 수 있도록
자료를 구분하여 표현한 것.

자료를 효율적으로 저장하고, 관리하기 때문에 잘 선택된 자료구조는 실행시간을 단축시켜주거나 메모리 용량의 절약이 가능

---------------

## 스택
자료의 입력과 출력을 한 곳으로 제한한 자료구조

LIFO (Last in First Out)

**Stack**

가장 늦게들어온 것이 가장먼저 나간다는 뜻
![](./images/image01.png)

```js
var third = function(){
  console.log('third');
}
var second = function(){
  third();
  console.log('second');
}
var first = function(){
  second();
  console.log('first');
}
first();
third();
```
> log의 결과값이 third > second > first > third 순으로 찍히게 된다.

---------------

**Linked List Stack**

위의 구현한 스택은 문제점이 존재한다. 배열처럼 스택의 용량을 정해두고 데이터를 쌓아야만 함.

스택의 용량을 초과할 경우 위에 있는 데이터를 빼내야만 다른 데이터를 넣을 수 있음.

![](./images/image02.gif)

**장점**
- 크기에 제한을 가지고 있지 않다.
- 중간 삽입, 삭제가 array에 비하여 쉽다.
- 삽입, 삭제에 대한 비용이 적다. O(1)
- 때문에 c,c++ 등에서 자료구조를 구현할때 linked list를 주로 활용한다.

**단점**
- 탐색에 있어서 단방향이다.
- 탐색에 대하여 비용이 크다. O(n)
- 때문에 삽입,삭제 에 있어서 이전 노드의 주소(객체)의 정보를 가지고 있어야 한다.
- 이중 연결 리스트가 방안이 될 수 있다.


```js
var Stack = function(){
  this.dataStore = []; // 데이터들을 넣어줄 공간
  this.top = 0; // 초기에는 쌓인 값이 없으니 0으로 초기화해줍니다.
};
Stack.prototype.push = function(data){
  this.dataStore[this.top++] = data;
};
Stack.prototype.pop = function(){
  return this.dataStore[--this.top];
};
Stack.prototype.length = function(){
  return this.top; // top 반환
};
Stack.prototype.clear = function(){
  this.top = 0;
};

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);  
console.log('요소제거', stack.pop()); // 3
console.log('length', stack.length()); // 2 
stack.clear();
console.log('length', stack.length()); // 0
```

---------------

## 큐
자료의 입력과 출력을 한 쪽 끝으로 제한한 자료구조

FIFO (First in First Out)

주로 tree의 깊이 우선탐색, sliding window 등 주로 순서 처리의 시스템에 쓰인다.


![](./images/image03.png)


**단점**
- 큐에 빈 메모리가 남아 있어도 꽉 차있는 것으로 판단할 수 있음. rear가 배열의 끝에 도달했을 경우

> 개선된 원형 큐가 나옴

![](./images/image05.png)

**원형 큐의 단점**
- 메모리 공간은 잘 활용하나 배열로 구현되어 있기 때문에 큐의 크기가 제한이 되는 단점이 존재

> 링크드 리스트로 큐가 나옴



링크드 리스트로 구현한 큐는 큐의 제한이 없고 삽입, 삭제가 편리하다




```js
//Queue의 생성자 정의
// dataStore(property) = 요소 저장공간
// enqueue(func) = 요소추가
// dequeue(func) = 요소꺼내기
// font(func) = 큐의 맨앞에 있는 요소 확인 꺼내지는 않습니다.
// back(func) = 큐의 맨뒤에 있는 요소 확인 꺼내지는 않습니다.
// length(func) = 큐의 요소 갯수
// empty(func) = 큐가 비었는지 안비었는지 알려줍니다.
// toString() = 모든 요소 출력

function Queue(){
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}

function enqueue(element){
    //여기서 push함수는 Array의 내장함수이다.
    //요소를 배열 맨 뒤에 삽입.
    this.dataStore.push(element);
}

function dequeue(){
    //shift는 Array의 내장함수이다. 
    //배열내의 맨 앞 요소를 반환하고 배열내에서 삭제한다.
    return this.dataStore.shift();
}

//큐의 맨 젓번째 요소 반환
function front(){

    //배열의 첫번째 요소 반환
    return this.dataStore[0];
}


//큐의 맨 끝 요소 반환
function back(){

    //배열의 맨 끝 요소 반환
    return this.dataStore[this.dataStore.length-1];
}


//큐에 저장된 요소 모두 출력
function toString(){
    var retStr="";
    for(var i=0; i<this.dataStore.length; i++)
    {
        retStr=retStr + this.dataStore[i] + "\n";
    }
    return retStr;
}

//큐 비우기
function empty(){
    if(this.dataStore.length==0){
        return true;
    }
    else{
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
console.log("Dequeued elemet: "+queueObject.dequeue());

//Queue의 모든 요소 출력
console.log("Element of Queue");
console.log(queueObject.toString());

//큐의 맨 앞의 요소 출력
console.log("Front of queue : " + queueObject.front());

//큐의 맨 뒤 요소 출력
console.log("Back of queue : " + queueObject.back());
```