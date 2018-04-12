# Training JS #13:

Suppose a function or class uses default settings to perform certain actions. A user may pass a custom configuration object of their own to override some of these default settings. The function below is a utility function to merge the default settings and the user-defined options passed in as the argument.

```js
mergeWithDefaults({
  length: 12,
  speed: 100,
  onStart: function () {
    console.log('started!');
  }
});
/*
returns {
  length: 12,
  speed: 100,
  delay: 500,
  onStart: function () {
    console.log('started!');
  },
  onFinish: function () {}
}
*/
```
> Modify the function below so that it returns the merged object.

### My Solution:
```js
function mergeWithDefaults(options) {
  var defaults = {
    length: 1000,
    speed: 10,
    delay: 500,
    onStart: function () {},
    onFinish: function () {}
  };
  // IE10부터, 모바일은 갤3 안됨 Polyfil이 따로 있으니 확인해 볼 것
  return Object.assign({}, defaults, options)
}
```

## Solution by Others:
```js
for( prop in options ) {
  // .... prop은 key
  // .... defaults[ prop ]은 value
  // 조건문을 무조건 돌아야한다. prototype까지 체크하기 때문에
  if( options.hasOwnProperty(prop) ) {
    ...
  }
} 
```

```js
var obj = {0: 'a', 1: 'b', 2: 'c'}

Object.keys(obj).forEach(key => {
  console.log(obj[key]);
})
```