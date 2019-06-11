# Observer pattern example

```js
var ctx = document.getElementById("panel").getContext("2d");
  var btnIncrease = document.querySelector('#btnIncrease');
  var btnDelete = document.querySelector('#btnDelete');

  var state = {
    tick : 0
  }

  const update = new Event('update');

  
  function setState(newState){
    Object.assign(state, newState);
    document.dispatchEvent(update);
    console.table(state);
  }

  function render(){
    const args = Array.prototype.slice.call(arguments);
    document.addEventListener('update', function(){
      args.forEach(function(fn){
        fn();
      });
    });
  }

  function a(number){
    return function(){
      document.getElementById('target').innerHTML = `<div>${state.tick + number}</div>`;
    }
  }

  // render
  render(
    a(1000),
    a(1000),
    a(1000),
    a(1000),
    a(1000),
    a(1000)
  );
  // elem listener
  btnIncrease.addEventListener('click', function(){
    setState( { tick:state.tick+1 } );
  });




// <!-- 
//   var Vespasianus = (function() {
//   function Vespasianus() {
//     this.subscribers = [];
//   }
//   Vespasianus.prototype.publish = function() {
//     var self = this;
//     this.subscribers.every(function(subscriber) {
//       subscriber.fire(self);
//       return true;
//     });
//   };
//   Vespasianus.prototype.register = function(target) {
//     console.log(target);
//     this.subscribers.push(target);
//   };
//   return Vespasianus;
// })();

// var Mucianus = (function() {
//   function Mucianus() {
//     this.list = [];
//   }
//   Mucianus.prototype.subscribe = function(target) {
//     this.list.push({
//       target: target,
//       point: 0,
//     });
//     target.register(this);
//   };
//   Mucianus.prototype.unsubscribe = function(target) {
//     this.list.filter(function(person) {
//       console.log(person, target);
//       return person.target !== target;
//     });
//   };
//   Mucianus.prototype.fire = function(target) {
//     this.list.some(function(person) {
//       if (person.target === target) {
//         ++person.point;
//         return true;
//       }
//     });
//   };
//   return Mucianus;
// })();

// var vespasianus = new Vespasianus();
// var mucianus = new Mucianus();
// mucianus.subscribe(vespasianus);
// vespasianus.publish();
// mucianus.list; // [{ target: Vespasianus, point: 1 }]
//  -->
```