# Training JS #42 : 가운데 글자 가져오기

단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

**재한사항**
> s는 길이가 1 이상, 100이하인 스트링입니다.

## My Solution:
```js
function solution(s) {
  var answer = '';
  var arr = s.split('');
  var center = parseInt(arr.length / 2);

  if (arr.length % 2 === 1) {
    answer = arr[center]
  } else {
    answer = arr[center - 1] + arr[center]
  }

  return answer;
}
```

## Solution by Others:
```js
function solution(s) {
    return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
// 세상 짧다,...
```