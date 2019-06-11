## Array.prototype.concat()
nested array 일 경우 element의 1-depth 만 풀어져서 합쳐진다. immutable.js 나 underscore, lodash 등을 이용하면 더 깊은 깊이의 array도 풀어서 반환해주는 메소드도 있는 거로 기억함. 나중에 product를 만들 때 응용해봐야징.

call by reference 라서 참조된 객체가 수정되면 리턴값도 바뀐다.

## String.prototype.charAt()
파라미터는 num 이고 ‘num’ 번째 char가 반환됨

## String.prototype.IndexOf()
파라미터는 char,[num](fromIndex)이고 왼쪽으로부터 ‘char’의 인덱스값이 반환됨

## String.prototype.subString()
파라미터는 num1,num2 이고 1~2까지의 string을 반환함

## Array.prototype.forEach()
파라미터는 callback(currentValue[,index,array]),[thisArg] 이고 원본수정,리턴값x