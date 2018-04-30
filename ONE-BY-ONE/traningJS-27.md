# Training JS #27:

Create a function that can compose an arbitrary number of other functions, the composed function of which takes a number as input. Composing means the input is run through a series of functions, such as this:

`double(cube(addOne(1)));`

The statement is evaluated from inside-out. In other words, `double` takes the result of cubing the result of `addOne(1)`. So `addOne` returns 2 (1 + 1), then `cube` takes `2` as input, spits out `8` for double (2 * 2 * 2), which finally returns 16 (8 * 2).

The function should take functions as arguments, with the outermost function being the first argument and the innermost being the last argument.


```js
var double = function (n) {
  return n * 2;
};
var cube = function (n) {
  return Math.pow(n, 3);
};
var addOne = function (n) {
  return n + 1;
};

compose(double, cube, addOne)(1); // returns 16, equivalent to double(cube(addOne(1)))
```


### My Solution:
```js
function compose(/* fns */) {
  
}
```

## Solution by Others:
```js
function compose(cb1, cb2, cb3) {
  return function(n) {
    cb1(cb2(cb3(n)));
  }
}
```