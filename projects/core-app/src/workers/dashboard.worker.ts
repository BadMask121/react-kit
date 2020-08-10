// @ts-nocheck
// @ts-ignore
onmessage = function(e) {
  const data = e.data;
  postMessage("hi from worker - got -" + data);
};
