# Training JS #11:

Write the code necessary in order to make the following work without errors. It will be run beneath your code.

```js
var mike = new Person({
  name: 'Mike Smith',
  age: 40,
  salary: 50000,
  savings: 10000,
  status: 'alive'
});
mike.birthday(); // mike.age === 41
mike.pay(100); // mike.savings === 10100
mike.fire(); // mike.salary === 0
mike.kill(); // mike.status === 'dead'
```

### My Solution:
```js
function Person (data) {
  this.name = data.name;
  this.age = data.age;
  this.salary = data.salary;
  this.savings = data.savings;
  this.status = data.status;
}

var mike = new Person({
  name: 'Mike Smith',
  age: 40,
  salary: 50000,
  savings: 10000,
  status: 'alive'
});

Person.prototype.birthday = function() {
  return this.age + 1
}

Person.prototype.pay = function(data) {
  return this.saving + data
}
Person.prototype.fire = function() {
  return this.salary = 0
}
Person.prototype.kill = function() {
  return this.status = 'dead'
}
```