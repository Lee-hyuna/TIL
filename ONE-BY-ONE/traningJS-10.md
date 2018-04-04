# Training JS #10:

Suppose the web page you are building requires that all elements with a class of empty have their innerHTML content emptied (made an empty string) once the button with an id of btn-empty is clicked.
Write the code necessary to do this here:

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