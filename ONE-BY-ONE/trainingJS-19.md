# Training JS #19:

Create a function that converts a temperature in degrees to and from Celsius and Fahrenheit. It should take a string that can be in either measurement which the function can recognize and appropriately return the converted value.
The function will be given a string in the following format (examples):

`"178F"`

`"0C"`

`"-89F"`

`"99C"`

The formula to convert Fahrenheit to Celsius is:

`C = (5/9) * (F - 32)`

The formula to convert Celsius to Fahrenheit is:

`F = (9/5) * C + 32`

Round your answer to the nearest whole number.


```js
convert('100C'); // returns '212F'
convert('50F'); // returns '10C'
convert('-40C'); // returns '-40F'
convert('4F'); // returns '-16C' (rounded)
```

### My Solution:
```js
function convert(temp) {
  if(temp.charAt( temp.length-1 ) === 'F') {
    return Math.round( (5/9) * (parseInt(temp) - 32) ) + 'C'
  }else {
    return Math.round( (9/5) * parseInt(temp) + 32 ) + 'F'
  }
}
```

## Solution by Others:
```js
const CELSIUS = "C";
const FAHRENHEIT = "F";

function convert(temp) {
  var isCelsuis = temp.indexOf( CELSIUS ) > -1;

  var arr = temp.split( isCelsuis ? CELSIUS : FAHRENHEIT );
  var num = parseInt( arr[ 0 ] );

  var ret;

  if( isCelsuis ) {
      ret = Math.round( (9/5) * num + 32 ) + FAHRENHEIT;
  } else {
      ret = Math.round( (5/9) * (num - 32) ) + CELSIUS;
  }

  return ret;
}
```