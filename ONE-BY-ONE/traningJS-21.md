# Training JS #21:

Suppose you are creating a countdown timer which displays how many hours, minutes, and seconds there are remaining on the clock.
Create a function that takes a number in seconds that are remaining as input and returns a string in this format:

`Xh Ym Zs`

where `X` is hours remaining, `Y` is minutes remaining, and `Z` is seconds remaining.

```js
getTimeRemaining(3600); // returns '1h 0m 0s'
getTimeRemaining(55); // returns '0h 0m 55s'
getTimeRemaining(795); // returns '0h 13m 15s'
```

### My Solution:
```js
function getTimeRemaining(remainingSeconds) {
  var h = 0, m = 0, s = 0

  s = remainingSeconds % 60
  m = Math.floor(remainingSeconds / 60)
  if(m >= 60) {
    h = Math.floor( m / 60 )
    m = 0
  }
  
  return h + 'h ' + m + 'm ' + s + 's'
}
```

## Solution by Others:
```js
function getTimeRemaining(remainingSeconds) {
  var sec = remainingSeconds % 60;
  
  var hour = Math.floor( remainingSeconds / 3600 );

  remainingSeconds = remainingSeconds - ( hour * 3600 );

  var min = Math.floor( remainingSeconds / 60 );

  return hour + "h" + min + "m" + sec + "s";
}
```