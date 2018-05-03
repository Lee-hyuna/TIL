# Training JS #30: methods of Math---pow() sqrt() and cbrt()

In this lesson we learn three methods of Math: pow() sqrt() and cbrt(). Their usage is very simple: sqrt() returns the square root of a number; cbrt() returns the cube root of a number; pow() returns the base to the exponent power.

> Their definitions and detailed information:

```js
Math.pow();
Math.sqrt();
Math.cbrt();
```

> Here we use some examples to understand their usage:

```js
var arr1 = [1, 4, 9];
var sqroot = arr1.map(Math.sqrt);
console.log(sqroot); //output: [1,2,3]

var arr2 = [1, 8, 27];
var cbroot = arr2.map(Math.cbrt);
console.log(cbroot); //output: [1,2,3]

var arr3 = [1, 2, 3];
var pow2 = arr3.map(x => Math.pow(x, 2));
var pow3 = arr3.map(x => Math.pow(x, 3));
console.log(pow2); //output: [1,4,9]
console.log(pow3); //output: [1,8,27]
```

> `pow()` can use a simplified form: \*\* operatorcan. See example:

```js
var n = 2;
console.log(Math.pow(n, 2)); //output: 4
console.log(n * n); //output: 4
console.log(n ** 2); //output: 4

console.log(Math.pow(n, 3)); //output: 8
console.log(n * n * n); //output: 8
console.log(n ** 3); //output: 8
```

> The second parameters of the pow() can be used as a fractional or decimal fraction, thus getting the same results as sqrt() and cbrt(). See example:

```js
var n = 64;
console.log(Math.sqrt(n)); //output: 8
console.log(Math.pow(n, 0.5)); //output: 8
console.log(Math.pow(n, 1 / 2)); //output: 8

console.log(Math.cbrt(n)); //output: 3.9999999999999996
console.log(Math.pow(n, 0.333333333333333333)); //output: 3.9999999999999996
console.log(Math.pow(n, 1 / 3)); //output: 3.9999999999999996
```

Look at the example above, what's the problem? Yes, the cube root of 64 should be 4, but we have not seen the 4, but see 3.9999999999999996. Due to the numerical precision of JS, the error will be produced in the calculation. This is a problem that can't be avoided. 

> We should pay attention to this problem in use, look at the following example:

```js
function isCube(m, n) {
  return Math.cbrt(m) == n;
}
console.log(isCube(27, 3)); //output: true
console.log(isCube(64, 4)); //output: false
console.log(isCube(125, 5)); //output: false
```

> This function is used to verify whether n is the cube root of m. It is obvious that the result is wrong. We should verify like this:

```js
function isCube(m, n) {
  return m == n ** 3;
  //or: return m==n*n*n
}
console.log(isCube(27, 3)); //output: true
console.log(isCube(64, 4)); //output: true
console.log(isCube(125, 5)); //output: true
```

> This method can also be used to verify the number of squares. The following three methods are used to verify that the square root of a number is an integer:

```js
function intRoot1(n) {
  return Number.isInteger(Math.sqrt(n));
}
function intRoot2(n) {
  return Math.sqrt(n) % 1 == 0;
}
function intRoot3(n) {
  var x = Math.round(Math.sqrt(n));
  return x * x == n;
}

console.log(intRoot1(16)); //output: true
console.log(intRoot2(16)); //output: true
console.log(intRoot3(16)); //output: true
```

The third method is the longest, but it is the most stable one.

### My Solution:
```js
function cutCube(volume,n){
  //coding here...
  
}
```
