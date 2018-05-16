# Training JS #37

## 문자열 다루기 기본

alpha_string46함수는 문자열 s를 매개변수로 입력받습니다.

s의 길이가 4혹은 6이고, 숫자로만 구성되있는지 확인해주는 함수를 완성하세요.

예를들어 s가 a234이면 False를 리턴하고 1234라면 True를 리턴하면 됩니다

### My Solution:
```js
function alpha_string46(s){
  var result = false
  // 함수를 완성하세요
  var str = s.split('')
  if(str.length === 4 || str.length === 6) {
      if(!Number(s)) {
          result = false
      }else {
          result = true
      }
  }
  return result;
}
```