# Training JS #39 : 괄호 확인하기

is_pair 함수는 문자열 s 를 매개변수로 입력받습니다.
s 에 괄호가 알맞게 짝지어져 있으면 True 를 아니면 False 를 리턴하는 함수를 완성하세요.
예를들어 s 가 (hello)()면 True 이고, )(이면 False 입니다.
s 가 빈 문자열("")인 경우는 없습니다.

```js
function is_pair(s) {
  var result = false;
  var arr = s.split("");
  var a;
  var b;
  for (var i = 0, len = arr.length; i < len; i++) {
    a = arr[i];
    b = arr[i + 1];
    if (a === "(" && b === ")") {
      result = true;
    }
    if (a === ")" && b === ")") {
      result = false;
    }

    if (a === ")" && b === "(") {
      result = false;
    }
  }
  return result;
}
```


## Solution by Others:

```js
function is_pair(s){
  var result = true;
  var count = 0;

  for(var i = 0; i < s.length; i++){
    count += (s[i] == '(')? 1 : (s[i] == ')')? 1 : 0;
    if(count == 1 && s[i] == ')'){
      result = false;
      break;
    }
    result = (s[i] == '(')? false : (s[i] == ')')? true : false;
  }
    result = (s[0] == ')')? false : (count % 2 == 1)? false : true;


    return result;
}

```


```js
function is_pair(s){
  var result = true;
  var checkArr = Array();
  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) === "("){
      checkArr.push(0);
    }else if(s.charAt(i) === ")"){
      if (checkArr.lastIndexOf(0) !== -1) {
        checkArr[checkArr.lastIndexOf(0)] = 1;
      }else{
        return false;
      }
    }
  }
  checkArr.map((value)=> {
    result = result && (value === 1);
  })
  return result;
}

```