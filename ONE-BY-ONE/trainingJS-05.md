# Training JS #5:

Create a function that takes a string and returns it with all of the vowels (letters a, e, i, o, u) removed.
```js
removeVowels('Hello, world!'); // returns 'Hll, wrld!'
removeVowels('XaAeEiIoOuUX'); // returns 'XX'
removeVowels(''); // returns ''
```

### My Solution:
```js
function removeVowels(str) {
  return str.replace(/\o|\a|\e|\i|\u|\O|\A|\E|\I|\U/g,'')
}
```

## Solution by Others:
```js
function removeVowels(str) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var arr = str.split('');
  var newArr = arr.map(data => {
    vowels.forEach(v => {
      if(data === v.toUpperCase() || data === v.toLowerCase()) { data = '';}
    });
    return data;
  });
  return newArr.join('');
}
```