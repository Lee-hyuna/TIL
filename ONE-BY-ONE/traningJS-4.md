# Training JS #4:

Write the code necessary so that when a user presses the enter (or return) key on keydown in an input field with an id of input, it gets cleared. The enter/return key has a name of 'Enter' and a code of 13.

### My Solution:
```
var inp = document.getElementById('inp');
inp.addEventListener('keydown', (evt) => {
  const keyName = evt.key;
  if(keyName === 'Enter') {
    inp.value = '';
  }
})
```

## Solution by Others:
...