# Training JS #28:

Create a function that determines if an rgb(a) color string is valid. It should return either `true` or `false`.

There are a number of edge cases to look out for. It must:

- Follow this format: `rgb(x,x,x)` or `rgba(x,x,x,x)`.
- There must be 3 numbers if there is no `a` (alpha) value, and 4 if there is.
- There must be no spaces between `rgb` or `rgba` and the first paranthesis `(`.
- There can be spaces (even tabs) between the numbers. `rgb( 5 , 2 , 0 )` is valid.
- The numbers must be between 0 and 255, or 0% and 100% if a percentage. For example, `rgb(0,100,255)` and `rgb(0%,50%,100%)` are valid.
- The numbers cannot be negative.
- Percentages cannot be mixed with non-percentage numbers.
- The alpha value must be between 0 and 1, or 0% to 100% if a percentage. Decimals are allowed, with or without a leading zero.


```js
isValidColor('rgb(0,0,0)'); // true
isValidColor('rgba(0,0,0,0.5)'); // true
isValidColor('rgb(  255 , 0 ,   255  )'); // true
isValidColor('rgba(255,100,1,.2)'); // true
isValidColor('rgb(100%,5%,0%)'); // true
isValidColor('rgba(0,0,0)'); // false
isValidColor('rgb(50%,50%,50)'); // false
isValidColor('rgb(0,0,0,0)'); // false
isValidColor('rgb(-1,0,256)'); // false
isValidColor('rgb(101%,0%,0%)'); // false
isValidColor('bgr(0,0,0)'); // false
isValidColor('rgba (0,0,0,0.5)'); // false
isValidColor('rgb(0,,0)'); // false
```

### My Solution:
```js
function isValidColor(color) {
  var result = true;
  var rgba = color.split('(')[0];
  var nSplitFir = color.split('(')[1];
  var nSplitLast = nSplitFir.split(')')[0];
  var num = nSplitLast.split(',');
  var persent = color.indexOf('%');
  var isSpace = color.split(' (').length > 1;
  var isMinus = color.split('-').length > 1;
  


  if(persent > -1) {
    if(num[0].split('%')[0] > 100) {
      return false
    }
    
    num.filter(data => {
      if(data.indexOf('%') === -1) {
        return false
      } 
    })
  }

  if(rgba !== 'rgba' && rgba !== 'rgb') {
    return false
  }
  
  if(rgba.length !== num.length) {
    return false
  }

  if(isSpace || isMinus) {
    return false
  }

  return result
}
```

## Solution by Others:
```js
function isValidColor(color) {
  let isResult = true;
  let data = color.split(',');
  let dataCount = data.length;
  let commaCount = dataCount - 1;
  let perCount = color.split('%').length - 1;
  let prefix = color.split('(')[0];
  let prefixCount = prefix.length;
  let isSpace = color.split(' (').length  > 1;
  let isMinus = color.split('-').length > 1;
  
  data.forEach(d => {
    if(!d.trim()) {
      isResult = false
    }
  });
  if(!(commaCount === 2 || commaCount === 3)) {
    return false;
  }
  if(perCount && perCount !== dataCount) {
    return false;
  }
  if(!(prefix === 'rgb' || prefix === 'rgba')) {
    return false;
  }
  if(prefixCount !== dataCount) {
    return false;
  }
  if(isMinus || isSpace) {
    return false;
  }
  return isResult;
}
```