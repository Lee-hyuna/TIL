# Training JS #3:

Create a function that masks a string of numbers, such as a credit card number. All numbers except the last 4 should be replaced with the character #.

```js
mask('123456789'); // returns '#####6789'
mask('12345'); // returns '#2345'
mask('1234'); // returns '1234'
mask(''); // returns ''
```

### My Solution:
```js
function mask(str) {
  var arr = str.split('').reverse();
  return arr.map((data, idx) => {
    if(idx > 3) data = '#'
    return data
  }).reverse().join('');
}
```

## Solution by Others:
...