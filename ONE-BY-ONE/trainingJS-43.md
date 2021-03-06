# Training JS #43 :

A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

Write a function:

```js
function solution(N);
```

that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

Assume that:

N is an integer within the range [1..2,147,483,647].

**Complexity:**

- expected worst-case time complexity is O(log(N));
- expected worst-case space complexity is O(1).


## My Solution:
```js
function solution(n) {
  var number = n.toString(2)
  var maxCount = 0
  var result = 0

  for(var i = 0, len = number.length; i < len; i++) {
    if(number[i] === '0') {
      maxCount++
      if(number[i+1] === '1') {
        result = result < maxCount ? maxCount : result
        maxCount = 0
      }
    }
  }
}

solution(647)
```

## Solution by Others:
```js
function solution(N) {
    const toBinary = N.toString(2)
    const notLastOne = toBinary.slice(0, toBinary.lastIndexOf(1) + 1)
    const filterZero = notLastOne.split(1).filter(x => x.indexOf('0') > -1)
    
    console.log(`tobinary:${toBinary}`)
    console.log(`notLastOne:${notLastOne}`)
    console.log(`filterZero:${filterZero}`)
    
    return filterZero.reduce((acc, val) => acc.length > val.length ? acc : val).length
}

console.log(solution(3180))
```

```js
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
    // write your code in JavaScript (Node.js 8.9.4)
    var result = 0;
    var arrayBinary = integerToBinary(N);
    var gabData = makeSeperateGab(arrayBinary);
    
    
    result = gabData.reduce(function(longValue , data){
        if(data.length){
            var newLongValue = countZero(data);
            longValue = (longValue > newLongValue)? 
                        longValue :
                        newLongValue;
                    
        }
        
        return longValue;
    }, result)
    
    
    return result;
    
}
// [[1,0,0,0], [1,0,0]]
function makeSeperateGab(array){
    var result = [];
    var stack = [];
    var temp = [];
    var isFlag = false;
    
    array.map(function(number){
        if(number === 1){
            if(stack[0]){
                stack.pop();
                result.push(temp);
            }
            isFlag = true;
            stack.push(number);
            temp = [];
        }
        
        if(isFlag){
            temp.push(number);    
        }
    });
    
    return result;
}

function countZero(array){
    var result = 0;
    array.map(function(number){
        if(number === 0){
            result++;
        }    
    })
    return result;
}

//console.log(countContinueZero([0,0,0,1,0,0,]));


function integerToBinary(integer){
    var result = [];
    var tempResult = [];
    var copyInterger = integer;
    var BINARY = 2;
    
    if(typeof integer !== "number"){
        throw new TypeError("type error");
    }
    
    while(copyInterger >= BINARY){
        var value = copyInterger % BINARY;
        tempResult.push(value);
        copyInterger = Math.floor(copyInterger / BINARY);
        if(copyInterger === 1){
            tempResult.push(copyInterger);
        }
    }
    
    result = tempResult;
    
    return result;
}

//console.log(integerToBinary(32));
```