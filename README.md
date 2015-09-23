## simple-queue
This is a simple in-memory job queue manager. It does not have support for db backup and is really only useful for a handful of scenarios. Once a task is added, the queue is automatically started.

#### Usage
```js
var queue = require('./queue');

// generic usage
queue.add(function(done) {
  setTimeout(function() {
    done();
  }, 1000);
});

// handler usage
queue.handler('my_job', function(done, args) {
  setTimeout(function() {
    console.log('args', args); // {cat: 'meow'}
    done();
  }, 1000);
});

queue.add('my_job', {
  cat: 'meow'
});
```
