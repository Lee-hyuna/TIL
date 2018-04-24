# Training JS #22:

Create a function that determines if an email is valid. Its purpose is only to determine if the string conforms to the basic structure of an email, not if it is a real, legitimate email. It should return `true` or `false`.

A valid email looks like this: `x@x.x.` It must have at least one character, then an `@` sign, then at least one character, then a . full stop (period), then at least one character. There cannot be two of the `@` characters, nor two of the .character but only after the `@` sign.

```js
isValidEmail('example@gmail.com'); // returns true
isValidEmail('example@.com'); // returns false
isValidEmail('s@y.c'); // returns true
isValidEmail('name@gmail'); // returns false
isValidEmail('name@@gmail.com'); // returns false
isValidEmail('name@gmail..com'); // returns false
isValidEmail('some.name@gmail.com'); // returns true
```

### My Solution:
```js
function isValidEmail(str) {
  var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  return exptext.test(str)
}
```

## Solution by Others:
...