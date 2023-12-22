---
sidebar_position: 1
---

# Import from CDN (no build)
### Using an `import` statement, in a module

```js
import h5wasm from "https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js";

// the WASM loads asychronously, and you can get the module like this:
const { FS, Module } = await h5wasm.ready;
```

### Using the async `import()` function
(useful in live demos!)

```js
const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
// then you can get the FileSystem object from the Module:
const { FS } = await h5wasm.ready;

// Or, you can directly get the FS if you don't care about the rest 
// of the module:
// const { FS } = await h5wasm.ready;

let response = await fetch("https://ncnr.nist.gov/pub/ncnrdata/vsans/202003/24845/data/sans59510.nxs.ngv");
let ab = await response.arrayBuffer();

FS.writeFile("sans59510.nxs.ngv", new Uint8Array(ab));

// use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
let f = new h5wasm.File("sans59510.nxs.ngv", "r");
// File {path: "/", file_id: 72057594037927936n, filename: "data.h5", mode: "r"}

console.log("keys: ", f.keys());
console.log("some data: ", f.get("entry/DAS_logs/counter/liveMonitor").value)

```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>