# Training JS #9:

Create a function that determines if a number is a multiple or a factor of another number.
Multiples of 3 are 3, 6, 9, 12, 15, and so on: they are numbers that 3 evenly goes into. Factors of 12 are 1, 2, 3, 4, 6, and 12; numbers that go evenly into 12.
The first parameter is the reference number, and the second parameter is either the factor or multiple.
The function should return 'factor' if the number is a factor of the reference number; 'multiple' if it is a multiple; false if neither; or 'both' if both.

```js
factorOrMultiple(4, 2); // returns 'factor'
factorOrMultiple(10, 100); // returns 'multiple'
factorOrMultiple(-10, 100); // returns 'multiple'
factorOrMultiple(1, 1); // returns 'both'
factorOrMultiple(10, 3); // returns false
```

### My Solution:
```js
function factorOrMultiple(reference, num) {
  if( reference / num === 1 ) {
    return 'both';
  }else if ( reference / num < 1 ) {
    return 'multiple'
  }else if ( reference / num > 0 ) {
    return reference % num === 1 ?  false :  'factor' 
  }
}
```