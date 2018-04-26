# Training JS #24:

jQuery is a JavaScript library designed to make DOM manipulations easier.
The jQuery function `$` can take a CSS selector string as an argument.

`$('p');`

This selects all p elements on the document and returns an object with many different methods which can manipulate the selected elements in different ways.

Your goal is to write the code necessary so that the following two pieces of code work as expected without errors (jQuery will NOT be loaded, you must write native JavaScript to effectively replicate a small part of jQuery's functionality).

This following code will:
- Add `click` event listeners to all `p` elements on the document, using the callback function defined as the last argument as the event handler.
- For the second piece, it will specifically use event delegation so that the callback will only be run if the event target has a class of `red`.
- Set the element's text content to the strings shown. In the second piece, it is the event target rather than the `p` element.

```js
$('p').on('click', function () {
  $(this).text('Clicked a p element.');
});

$('#app').on('click', '.red', function () {
  $(this).text('Clicked an element with a class of red.');
});
```

> The code above will be run beneath your code.

### My Solution:
```js
var el = document.querySelectorAll('p');
function modifyText() {
  this.innerHTML = this.className === 'red' ? 'Clicked an element with a class of red.' : 'Clicked a p element.'
}

for(var i = 0, len = el.length; i < len; i++) {
  el[i].addEventListener('click', modifyText.bind(el[i]));
}
```

## Solution by Others:
```js
```