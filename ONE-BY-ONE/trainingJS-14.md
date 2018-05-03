# Training JS #14:

Modify the code below so that this will work without errors:

```js
function x() {
  function doThing() {}
  function doAnotherThing() {}
}
x().doThing().doAnotherThing();
```

### My Solution:
```js
function x () {
  return {
    doThing: function () {
      return {
        doAnotherThing: function (){}
      }
    }
  }
}
```

## Solution by Others:
```js
function x () {
  this.doThing = function() { return this }
  this.doAnotherThing = function() { console.log('test..') }
  return this
}
```