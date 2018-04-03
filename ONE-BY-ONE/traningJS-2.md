# Training JS #2:

Create a function that returns the largest number in an array of numbers. The array will always have at least 1 number.

```js
largest([1,2,3,4,5]); // returns 5
largest([-100,Infinity,5,2,7218902]); // returns Infinity
largest([0]); // returns 0
```

### My Solution:
```js
function largest(numbers) {
  return Math.max.apply(null, numbers)
}
```

## Solution by Others:
...
