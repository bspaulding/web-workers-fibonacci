var getWorker = (function() {
  var workers = [makeWorker()];
  return function() {
    return workers[0];
  };
}());

function makeWorker() {
  var worker;
  if (window.Worker) {
    worker = new Worker("worker.js");
    worker.onmessage = function(event) {
      console.log("fib(" + event.data.n + ") = " + event.data.f + ", took " + event.data.time + " ms");
      document.querySelector('#fibs-n-' + event.data.n).textContent = event.data.f;
      document.querySelector('#fibs-time-' + event.data.n).textContent = event.data.time;
    };
  } else {
    worker.postMessage = function() {};
  }

  return worker;
}

var n = 0;

document.querySelector('#increment').addEventListener('click', function() {
  n += 1;
  doAFib(n);
});
document.querySelector('#increment-10').addEventListener('click', function() {
  for (var i = 0; i < 10; i += 1) {
    n += 1;
    doAFib(n);
  }
});
document.querySelector('#increment-50').addEventListener('click', function() {
  for (var i = 0; i < 50; i += 1) {
    n += 1;
    doAFib(n);
  }
});

var doAFib = function(n) {
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.appendChild(document.createTextNode(n));
  tr.appendChild(td);
  td = document.createElement('td');
  td.setAttribute('id', 'fibs-n-' + n);
  tr.appendChild(td);
  td = document.createElement('td');
  td.setAttribute('id', 'fibs-time-' + n);
  td.appendChild(document.createTextNode('Calculating...'));
  tr.appendChild(td);
  document.querySelector('#fibs tbody').appendChild(tr);

  getWorker().postMessage({ n: n, useMemoization: useMemoization() });
};

function useMemoization() {
  return document.querySelector('#memoize').checked;
}

