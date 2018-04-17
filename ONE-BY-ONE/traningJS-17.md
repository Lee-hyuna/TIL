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
// 진행중
function longestWord(str) {
      var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
      var deleteSpecChar = str.replace(regExp, '')
      var word = deleteSpecChar.split(' ')
      var arr = []
      for(var i = 0, len = word.length; i < len; i++) {
        var obj = { 
          word: word[i],
          length: word[i].length
        }
        arr.push(obj)
      }
      
      arr.sort(function(a,b) {
        return b['length'] - a['length']
      })
      console.log(arr)
      // for문을 돌면서 빈 배열을 만들고
      // 0번째 인덱스는 무조건 집어넣고, 그 다음 인덱스랑 비교하고
      // length가 같으면 배열에 집어넣고 아니면 버리고 리턴
      // console.log(arr[0])
      var result = [];
      var temp = 0; // 제일 큰 length 담은 변수
      
      for(var x = 0, len = arr.length; x < len; x++) {
        if(!temp) { 
          temp = arr[x].word;
          result.push(arr[x])
          }
        if(temp.length < arr[x].length) {
          result = [];
          result.push(arr[x]);
          temp = arr[x]
        }
        if(temp !== arr[x].word && temp.length === arr[x].length) {
          result.push(arr[x]);
        }
      }
    }
```

## Solution by Others:
...