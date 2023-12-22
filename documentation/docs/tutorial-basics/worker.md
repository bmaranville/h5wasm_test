---
sidebar_position: 1
---
# Web Worker

Since ESM is not supported in all web worker contexts (e.g. Firefox), an additional  ```./dist/iife/h5wasm.js``` is provided in the package for `h5wasm>=0.4.8`; it can be loaded in a worker and used as in the example below (which uses the WORKERFS file system for random access on local files):
```js
// worker.js
onmessage = async function(e) {
    const { FS } = await h5wasm.ready;
    
    // send in a file opened from an <input type="file" />
    const f_in = e.data[0];

    FS.mkdir('/work');
    FS.mount(FS.filesystems.WORKERFS, { files: [f_in] }, '/work');

    const f = new h5wasm.File(`/work/${f_in.name}`, 'r');
    console.log(f);
}

self.importScripts('https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/iife/h5wasm.js');
```

```js
// Define worker code
const workerCode = `
// worker.js
onmessage = async function(e) {
  const { FS } = await h5wasm.ready;
  const { url } = e.data;
  const ab = await (await fetch(url)).arrayBuffer();
  const filename = "test.h5";
  if (FS.isFile(filename)) FS.unlink(filename);
  FS.writeFile(filename, new Uint8Array(ab));
  f = new h5wasm.File(filename, 'r');
  keys = f.keys();
  postMessage({keys});
}
self.importScripts('https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/iife/h5wasm.js');
`

const blob = new Blob([workerCode], {type: 'application/javascript'});
const workerUrl = URL.createObjectURL(blob);
const worker = new Worker(workerUrl);
worker.onmessage = function(e) {
   alert(JSON.stringify(e.data));
};
const file_url = "https://ncnr.nist.gov/pub/ncnrdata/vsans/202003/24845/data/sans59510.nxs.ngv"
worker.postMessage({url: file_url});
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

