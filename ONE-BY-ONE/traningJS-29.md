# Training JS #29:
Expose Numbers Within Buttons with Loop

### My Solution:
```js
var btn = document.querySelectorAll('.button-test');
function btnEvt(idx) {
  var btnElement = btn[idx];
  btnElement.addEventListener('click', function() {
    alert(idx);
  })
}
for(var i = 0; i < btn.length; i++) {
  btnEvt(i)
}
```

## Solution by Others:
...