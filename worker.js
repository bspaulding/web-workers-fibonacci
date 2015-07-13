var knownFibs = {};
var useMemoization = false;

var fib = function(n, acc) {
  if (!acc) { acc = 0; }

  if (n === 0) {
    return acc + 0;
  }

  if (n === 1) {
    return acc + 1;
  }

  if (useMemoization && knownFibs[n]) {
    return knownFibs[n];
  }

  return fib(n - 1) + fib(n - 2);
};

onmessage = function(event) {
  useMemoization = event.data.useMemoization;
  var startTime = (new Date()).getTime();
  var f = fib(event.data.n);
  var endTime = (new Date()).getTime();
  knownFibs[event.data.n] = f;
  postMessage({ n: event.data.n, f: f, time: endTime - startTime });
};
