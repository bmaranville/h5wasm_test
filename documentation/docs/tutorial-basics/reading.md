---
sidebar_position: 1
---
# Reading HDF5

## In a browser
In the browser's main thread, files have to be read into memory and then written to the 
default `MEMFS` virtual filesystem from Emscripten prior to loading.

### From a URL

```javascript
const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
// the WASM loads asychronously, and you can get the module like this:
const Module = await h5wasm.ready;

// then you can get the FileSystem object from the Module:
const { FS } = Module;

let response = await fetch("https://ncnr.nist.gov/pub/ncnrdata/vsans/202003/24845/data/sans59510.nxs.ngv");
let ab = await response.arrayBuffer();
console.log("file retrieved - length: ", ab.byteLength);

FS.writeFile("sans59510.nxs.ngv", new Uint8Array(ab));

// use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
let f = new h5wasm.File("sans59510.nxs.ngv", "r");
console.log(f.get("entry/DAS_logs").keys());
f.close();
```
<codapi-snippet engine="browser" sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### From local files
Using an `<input type="file">` element, you can read files from the user's local filesystem.
The file contents first have to be read into an ArrayBuffer and then written to the 
Emscripten `MEMFS` virtual filesystem (the default FS, accessible as `Module.FS`).  


```javascript
const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
const { FS } = await h5wasm.ready;

// this will add a file input below - select an HDF5 file and the keys
// will be displayed in an alert after copying into memory
const file_input = document.createElement("input");
file_input.type = "file";
file_input.onchange = async function(el) {
    const { target: { files } } = el;
    const ab = await files[0].arrayBuffer();
    FS.writeFile(files[0].name, new Uint8Array(ab));
    const f = new h5wasm.File(files[0].name, 'r');
    alert(f.keys());
    f.close();
}
return file_input;
```
<codapi-snippet engine="browser" sandbox="javascript" editor="basic" init-delay="500" output-mode="dom">
</codapi-snippet>

