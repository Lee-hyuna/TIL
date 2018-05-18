# Training JS #39 : 핸드폰 번호 가리기

별이는 헬로월드텔레콤에서 고지서를 보내는 일을 하고 있습니다. 개인정보 보호를 위해 고객들의 전화번호는 맨 뒷자리 4자리를 제외한 나머지를 "*"으로 바꿔야 합니다.

전화번호를 문자열 s로 입력받는 hide_numbers함수를 완성해 별이를 도와주세요

예를들어 s가 "01033334444"면 "*******4444"를 리턴하고, "027778888"인 경우는 "*****8888"을 리턴하면 됩니다.

### My Solution:
```js
function hide_numbers(s){
  var arr = s.split('').reverse();
  console.log(arr)
  return arr.map((data, idx) => {
      if(idx > 3) data = '*'
      return data
  }).reverse().join('');
}
```

## Solution by Others:
```js
function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, "*");
}
```

```js
function hide_numbers(s){
  var result = "*".repeat(s.length - 4) + s.slice(-4);
  //함수를 완성해주세요

  return result;
}
```


> P.S 20몇번 문제였나 비슷한 문제가 있었던 것 같다...