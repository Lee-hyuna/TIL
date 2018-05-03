# Training JS #16:

Suppose you need to support a browser which does not support window.performance. Since window.performance is undefined, the code below will produce an error that will cause the script to terminate, breaking functionality.

Add onto the code below so that no error occurs for browsers with no `window.performance` support, and so that when `performance.now()` is called, it returns the number `0` for them. Supported browsers should remain unaffected.

```js
// DO NOT modify the code below, it will be tested.
var time = window.performance.now();
```

### My Solution:
```js
if( !window.performance ){
    window.performance = {
        now: function() {
            return 0;
        }
    }
} 
```

## Solution by Others:
...