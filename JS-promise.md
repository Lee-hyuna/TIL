# Javascript - Promise

콜백이 그냥커피라면, 프로미스는 TOP
자바스크립트에는 비동기로 이루어진 기능이 많다.
버튼을 눌렀을 때 이벤트가 발생 > 해당 특정 작업을 수행(콜백 호출)의 기능이지만, 규모가 커지면서 콜백중첩에 이어 콜백지옥에 빠지게 된다
> 예를들면, 아래 코드처럼
```js
step1(function (value1) {
    step2(function (value2) {
        step3(function (value3) {
            step4(function (value4) {
                step5(function (value5) {
                    step6(function (value6) {
                        // Do something with value6
                    });
                });
            });
        });
    });
});
```

콜백지옥.. 이를 극복하기 위해 promise가 나왔다.
```js
// promise 실행
this.promiseAjax()
.then((res) => {
  console.log('res111===',res)
  return this.promiseAjax()
})
.then((res) => {
  console.log('res222===',res)
})
```
then, catch를 통해 중첩 콜백에서 탈출, 순차/병렬 순서맘대로! 예외처리!


```js
// Promise 선언
function promiseAjax (ajaxMethod) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/api/blah..",
      success: function(res) {
        console.log('success')
        resolve(res)
      },
      error: function(error) {
        console.log('error')
        reject(error)
      }
    })
  })
}
```
실행 결과는 console.log로 'success'가 노출이 된 것을 볼 수 있다.
해당 코드는 promise의 기초에 대해 가장 명확하게 이해할 수 있는 코드.

## 프로미스의 3가지 STATES
프로미스를 사용할 때 알아야하는 기본적인 개념으로, 말 그대로 '약속'이고 처리과정을 의미한다.
- pending(대기) : 아직 프로미스가 수행중인 상태, 비동기 처리 로직이 완료되지 않음
- fulfilled(이행) : 프로미스가 지켜진 상태, 비동기 처리가 완료되어 결과값을 반환
- rejected(실패) : 프로미스가 어떠한 이유로 지켜지지 못한 상태, 비동기 처리가 실패 혹은 오류 발생

## 여러 함수 호출 예제
```js
new Promise(function(resolve, reject){
  // 비동기 처리 예제
	setTimeout(function() {
		resolve(1);
	}, 2000);
})
.then((result) => {
  console.log(result); // 1
	return result + 10;
})
.then((result) => {
  console.log(result); // 11
	return result + 20;
})
.then((result) => {
  console.log(result); // 31
})
```
resolve를 호출하고 > 프로미스가 pending(대기) 상태에서 fulfilled(이행) 상태로 넘어감 > 첫번째 .then에서 결과를 받고 > 결과값을 받아서 +10을 리턴 > 다음 두번째 .then으로 결과값을 넘김 > 넘김

순서가 된다. right?


## ERROR
체이닝형태로 연결된 상태에서 비동기 작업 중 에러가 나면 어떻게 처리해야하는가!!!

**바로바로 catch()**
```js
promiseAjax().then().catch(function(err) {
  console.log(err)
});
```
catch()는 .then(null, function() {})을 메서드 형태로 바꾼 것이라고 생각하면 됨.
아래의 예제처럼 

```js
promiseAjax()
.then((result) => {
	console.log('그룹1');
	throw new Error("Error in then()");
})
.catch((err) => {
  console.log('그룹1')
})
.then((result) => {
  console.log('그룹2')
})
```
첫번째 .then과 .catch는 그룹1로 한묶음인 셈이다! error > catch > 그룹2 순서로 실행이 된다!


## Promise.all
둘 이상의 프라미스를 조인하고, 지정된 모든 프라미스가 완료되거나 거부된 경우에만 반환됩니다.
즉, 여러개의 비동기 작업들이 존재하고 이를 모두 완료했을 때, 작업을 진행하고 싶다면 promise.all

```js
var promiseAjax1 = new promise(function(resolve, reject) {
  window.setTimeout(function() {
    console.log('first promise success');
    resolve('11111');
  }, 2000);
});

var promiseAjax2 = new promise(function(resolve, reject) {
  window.setTimeout(function() {
    console.log('second promise success');
    resolve('2222');
  }, 2000);
});

Promise.all([promiseAjax1, promiseAjax2].then(function(value) {
  console.log('All Success', value)
}))
```
Promise.all 은 배열 내 요소 중 어느 하나라도 거절(reject)하면 즉시 거절합니다. 
즉 Promise.all 은 빠르게 실패합니다: 만약 timeout 이후 결정(resolve)하는 4개의 Promise를 가지고 있고, 그 중 하나가 거절(reject)하면 Promise.all 은 즉시 거절합니다.


## 참고
- [Master the JS interview: Promise](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

- [Microsoft: Promise](https://msdn.microsoft.com/ko-kr/library/dn802826(v=vs.94).aspx)
- [Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)