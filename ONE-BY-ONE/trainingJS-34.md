# Training JS #34
## console.log의 Output은 무엇이며, 그 이유는 무엇일까?

```js
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```

위의 코드는 다음과 같이 console.log에 찍히게 된다:
```js
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```

`myObject` function에서는 self와 this는 `foo` 참조하게 되는데, func: ..내부에 있는 function의 this는 `myObject`를 참조하지 않는다.
`this.foo`를 찍었을 때 undefined가 뜬 이유는, 내부 함수에서의 this는 아무것도 가르키지않고있고 `self`는 해당 scope가 여전히 존재하기 때문에 거기에 접근 할 수 있게 된다
