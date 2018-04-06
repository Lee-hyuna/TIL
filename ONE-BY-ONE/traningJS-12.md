# Training JS #12:

Create a function that removes all duplicate items from an array. It should return a new array with the items of the input array in sequential order, minus the duplicate items.

```js
removeDuplicates([1,2,3,3,4,5]); // returns [1,2,3,4,5]
removeDuplicates([null,'str',null,'str']); // returns [null,'str']
removeDuplicates([{},{}]); // returns [{},{}]
```

### My Solution:
```js
function removeDuplicates(arr) {
  return [...new Set(arr)].filter(x => new Set(arr).has(x));
}
```

## Solution by Others:
...