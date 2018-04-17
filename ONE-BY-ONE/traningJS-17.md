# Training JS #17:

Create a function that returns the longest word of a sentence.
Every sentence ends with a single punctuation character; either a . (full stop), ! (exclamation mark), or ?(question mark). The only punctuation character that will occur anywhere in the sentence is , (comma). If there are multiple longest words in a sentence (two or more have the longest length), return the first one only.

문장 중에서 가장 긴 단어를 반환하는 함수를 만든다.
모든 문장은 구두점 한개의 문자로 끝납니다.
(정지),! (느낌표)또는?(물음표). 문장 중 어느 곳에서나 나타나는 유일한 구두점 문자는,(쉼표)뿐입니다. 
한 문장에 가장 긴 단어가 여러개 있으면(둘 이상이 가장 긴 길이를 가진 단어 두개 이상)첫번째 단어만 반환합니다.


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