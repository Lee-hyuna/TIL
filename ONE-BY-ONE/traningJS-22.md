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
```js
const AT = "@";
const DOT = ".";

function getIsLetter( str ) {
    // return str.match(/[a-z]/i);
    return str.search(/[a-z]/i) != -1;
}

function isValidEmail(str) {
  const LENGTH = str.length;

  let hasAT = false;
  let hasDot = false;

  let char;
  let isLetter;
  
  for(var i=0; i<LENGTH; ++i) {
      char = str.charAt( i );
      isLetter = getIsLetter( char );

      // 처음이랑 마지막이 문자가 아니면 false.
      if( ( i === 0 && !isLetter ) || ( i === LENGTH - 1 && !isLetter ) ) {
          return false;
      }
      
      if( !hasAT ) {
          if( char === AT ) {
              // @ 다음은 문자가 와야 됨.
              if( i === LENGTH - 1 || !getIsLetter( str.charAt( i + 1 ) ) ) {
                  return false;
              }

              hasAT = true;
          }
      } else if( !hasDot ) {
          if( char === DOT ) {
              // . 다음은 문자가 와야 됨.
              if( i === LENGTH - 1 || !getIsLetter( str.charAt( i + 1 ) ) ) {
                  return false;
              }

              hasDot = true;
          }
      } else if( !isLetter ) {
          // @, . 둘 다 있는데 문자가 아니면 false.
          return false;
      }
  }

  if( !hasAT || !hasDot ) {
      return false;
  }

  return true;
}
```