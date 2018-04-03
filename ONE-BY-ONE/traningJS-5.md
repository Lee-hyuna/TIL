# Training JS #5:

Create a function that takes a string and returns it with all of the vowels (letters a, e, i, o, u) removed.
```
removeVowels('Hello, world!'); // returns 'Hll, wrld!'
removeVowels('XaAeEiIoOuUX'); // returns 'XX'
removeVowels(''); // returns ''
```

### My Solution:
```
function removeVowels(str) {
  return str.replace(/\o|\a|\e|\i|\u|\O|\A|\E|\I|\U/g,'')
}
```

## Solution by Others:
...