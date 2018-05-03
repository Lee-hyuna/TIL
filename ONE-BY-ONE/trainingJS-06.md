# Training JS #6:

Fix all of the mistakes in the code below so that it works as expected without errors.

```js
function Student(name, age, classes) {
  Student.name = name;
  Student.age = age;
  Student.classes = classes;
}

Student.proto.addClass = function (class) {
  this[classes].add(class);
};

Student.proto.updateAge = function (age) {
  this[age] = age;
};

var sam = new Student('Sam', 15, ['English', 'Math', 'History', 'Science']);
sam.proto.addClass('Art');
sam.proto.updateAge(16);
```

### My Solution:

```js
function Student(name, age, classes) {
  this.name = name;
  this.age = age;
  this.classes = classes;
}

Student.prototype.addClassed = function (classed) {
  this.classes.push(classed);
};

Student.prototype.updateAge = function (age) {
  this.age = age;
};

var sam = new Student('Sam', 15, ['English', 'Math', 'History', 'Science']);
sam.addClassed('Art');
sam.updateAge(16);
```

## Solution by Others:

...
