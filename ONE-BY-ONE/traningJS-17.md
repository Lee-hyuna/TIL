# Training JS #17:

Create a function that returns the longest word of a sentence.
Every sentence ends with a single punctuation character; either a . (full stop), ! (exclamation mark), or ?(question mark). The only punctuation character that will occur anywhere in the sentence is , (comma). If there are multiple longest words in a sentence (two or more have the longest length), return the first one only.

```js
longestWord('This is a sentence.'); // returns 'sentence'
longestWord('My dogs and cats!'); // returns 'dogs' even though 'cats' is equally long
longestWord('How is it that despite millenia of research, we still know nothing?'); // returns 'millenia'
```

### My Solution:
```js
function longestWord(str) {
  var regEip = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
  var deleteSpecChar = str.replace(regEip, '')
  var word = deleteSpecChar.split(' ')
  var result = [];
  var temp = 0;

  for(var i = 0, len = word.length; i < len; i++) {
    if(!temp) { 
      temp = word[i];
      result.push(word[i])
    }
    if(temp.length < word[i].length) {
      result = [];
      result.push(word[i]);
      temp = word[i]
    }
    if(temp !== word[i] && temp.length === word[i].length) {
      result.push(word[i]);
    }
  }

  return result
}
```

## Solution by Others:
...