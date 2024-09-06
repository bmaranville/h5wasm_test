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

Try this example on a huge file!
```js
// get_keys_worker.js
import h5wasm from "https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js";
import { expose } from 'https://cdn.jsdelivr.net/npm/comlink@4.4.1/+esm';

async function init() {
  const { FS } = await h5wasm.ready;
  // only make the /work folder one time!
  FS.mkdir('/work');
  return FS;
}

const init_promise = init();

async function get_keys(files_obj) {
  // files_obj is file_input.files object transferred with Comlink
  const FS = await init_promise;
  const f_in = files_obj[0];

  // load the File object to WORKERFS for random access
  FS.mount(FS.filesystems.WORKERFS, { files: [f_in] }, '/work');

  const f = new h5wasm.File(`/work/${f_in.name}`, 'r');
  const keys = f.keys();
  f.close();
  // this has to be done before the next `FS.mount()`
  FS.unmount('/work');

  return keys
}

expose({get_keys});
```

```js
const comlink = await import("https://cdn.jsdelivr.net/npm/comlink");
const worker = new Worker('/code/get_keys_worker.js', {type: 'module'});
const remote = Comlink.wrap(worker);

const file_input = document.createElement("input");
file_input.type = "file";
file_input.onchange = async function() {
  const keys = await remote.get_keys(file_input.files);
  alert(`keys: ${JSON.stringify(keys)}`);
}
return file_input;
```
<codapi-snippet engine="browser" sandbox="javascript" output-mode="dom">
</codapi-snippet>
