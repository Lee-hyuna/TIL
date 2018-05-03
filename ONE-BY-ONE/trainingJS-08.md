# Training JS #8:

Create a function that determines if a number is prime.
A prime number is a positive integer which has no positive integer factors greater than 1, other than itself. For example, 13 is a prime number because only 1 and 13 evenly go into it. Negative numbers cannot be prime numbers, and 1 is not a prime number itself. The function should return true or false.

```js
isPrime(-4); // returns false
isPrime(0); // returns false
isPrime(1); // returns false
isPrime(2); // returns true
isPrime(3); // returns true
isPrime(4); // returns false
isPrime(5); // returns true
isPrime(13); // returns true
```

### My Solution:

```js
function isPrime(num) {
  if(num <= 1) return false
  else {
    for (var i = 2; i < num; i++) {
      if(num % i === 0) return false;
    }
    return num !== 1;
  }
}
```

## Solution by Others:
...