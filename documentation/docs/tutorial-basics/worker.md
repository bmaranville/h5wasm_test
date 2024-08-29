---
sidebar_position: 4
---
# Web Worker

## Motivation: Large Local Files
When used in the main browser thread, `h5wasm` uses the Emscripten `MEMFS` virtual filesystem, which requires that the entire file contents be
read into memory when the file is opened.  This can be a problem for very large files.

One solution is to use `h5wasm` in a Web Worker: there, we can use the `WORKERFS` virtual filesystem from Emscripten which provides
random file I/O for local files loaded from an input element.  This means that only the bytes needed to complete the current operation will
be read from the file.  This allows targeted retrieval of e.g. metadata or a small slice of a large dataset.

Since ESM is not supported in all web worker contexts (e.g. Firefox), an additional  ```./dist/iife/h5wasm.js``` is provided 
in the package for `h5wasm>=0.4.8`; it can be loaded in a worker and used as in the example below - try it on a huge file!
```js
// get_keys_worker.js
import h5wasm from "https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js";
import { expose } from 'https://cdn.jsdelivr.net/npm/comlink@4.4.1/+esm';

async function get_keys(files_obj) {
  // assume only one file chosen...
  const { FS } = await h5wasm.ready;
    
  // send in a file_input.files from an <input type="file" />
  const f_in = files_obj[0];

  FS.mkdir('/work');
  FS.mount(FS.filesystems.WORKERFS, { files: [f_in] }, '/work');

  const f = new h5wasm.File(`/work/${f_in.name}`, 'r');
  const keys = f.keys();
  f.close();

  return keys
}

expose({get_keys});
```

<label>Local file:<input type="file" id="file_input"></input></label>

```js
const comlink = await import("https://cdn.jsdelivr.net/npm/comlink");
const worker = new Worker('/code/get_keys_worker.js', {type: 'module'});
const remote = Comlink.wrap(worker);

const file_input = document.querySelector("#file_input");
if (file_input.files.length > 0) {
  const keys = await remote.get_keys(file_input.files);
  console.log({keys});
}
else {
  alert("choose a local file before pressing 'run'");
}
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>
