# Training JS #31: 

## Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.


### My Solution:
The following one line function will return true if str is a palindrome; otherwise, it returns false.

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

> For example:

```js
console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'
```