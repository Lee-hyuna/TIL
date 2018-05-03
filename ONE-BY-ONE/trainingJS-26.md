# Training JS #26:

Create a function that takes an array of unsorted numbers and returns an object with the properties `mean`, `mode`, and `median`.

Example usage:

```js
analyze([1, 3, 4, 2, 5]);
/*
{
  mean: 3,
  median: 3,
  mode: [1,2,3,4,5]
}
*/

analyze([-5, -5, 2, 1, 100, 8]);
/*
{
  mean: 16.83,
  median: 1.5, // average of 1 and 2
  mode: -5
}
*/
```

Each property's value should be a number rounded to 2 decimal places.
The mean is the average of the numbers.

The median is the middle number when the array is sorted. If the amount of numbers in the array is an even number, use the average of the two middle numbers.

The mode is the most frequently occurring number. If two or more numbers are the mode, return an array of the numbers – the array does not need to be sorted.

### My Solution:

```js
function analyze(numbers) {
  var mean = 0,
    median,
    mode = [];

  // 평균값
  for (var i = 0, len = numbers.length; i < len; i++) {
    mean = mean + numbers[i];
  }
  mean = mean / numbers.length;

  // 배열의 중간
  numbers.sort(function(a, b) {
    return a - b;
  });
  var center = parseInt(numbers.length / 2);

  if (numbers.length % 2 == 1) {
    // 요소 개수가 홀수면
    median = numbers[center];
  } else {
    median = (numbers[center] + numbers[center - 1]) / 2;
  }

  // 가장 자주 발생하는 숫자
  function longestWord(str) {
    var strWithoutSpecialChar = str.replace(/[^a-zA-Z ]/g, "");
    var arrChar = strWithoutSpecialChar.split(" ");

    var strLongest = "";
    var strNow;

    for (var i = 0; i < arrChar.length; ++i) {
      strNow = arrChar[i];

      if (strLongest.length < strNow.length) {
        strLongest = strNow;
      }
    }

    return strLongest;
  }

  var cache = {};
  for (var j = 0, len = numbers.length; j < len; j++) {
    var num = numbers[j];
    if (cache[num]) {
      mode = num;
      break;
    }
    cache[num] = num;
    mode.push(cache[num]);
  }

  // 리턴 값
  return {
    mean: String(mean).indexOf(".") === -1 ? mean : Number(mean.toFixed(2)), // 평균
    median: median, // 배열의 중간숫자, 짝수인 경우 두 중간 숫자의 평균
    mode: mode // 가장 자주 발생하는 숫자
  };
}
```

## Solution by Others:

```js
function analyze(numbers) {
  return {
    mean: function() {
      let total = numbers.reduce((prev, next) => prev + next);
      return total / numbers.length;
    },
    median: function() {},
    mode: function() {
      let obj = {};
      for (var i = 0; i < numbers.length; i++) {
        for (var j = 0; j < numbers.length; j++) {
          if (i !== j && numbers[i] === numbers[j]) {
            obj[numbers[i]] = 0;
          }
        }
      }
      let arr = Object.keys(obj);
      if (arr.length) {
        return arr.map(key => parseInt(key));
      } else {
        return numbers;
      }
    }
  };
}
```

```js
function analyze(numbers) {
  var meanVal;
  var medianVal;
  var modeVal;

  var sortNumbers = numbers.sort(function(a, b) {
    return a - b;
  });

  var total = 0;
  var len = sortNumbers.length;
  for (var i = 0; i < sortNumbers.length; i++) {
    total += sortNumbers[i];
  }
  meanVal = Math.floor(total / len * 100) / 100;
  console.log(Math.floor(total / len * 100) / 100);

  var averagePosition = len / 2 - 1;
  if (len % 2 === 1) {
    medianVal = sortNumbers[Math.ceil(averagePosition)];
    console.log(sortNumbers[Math.ceil(averagePosition)]);
  } else {
    medianVal =
      (sortNumbers[averagePosition] + sortNumbers[averagePosition + 1]) / 2;
    console.log(
      (sortNumbers[averagePosition] + sortNumbers[averagePosition + 1]) / 2
    );
  }

  modeVal = [];
  var tempArr = [];

  return {
    mean: meanVal,
    median: medianVal,
    mode: modeVal
  };
}
```
