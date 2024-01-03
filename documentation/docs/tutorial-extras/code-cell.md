## Code cells

```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```
<codapi-snippet sandbox="python" editor="basic" init-delay="500">
</codapi-snippet>

```js
const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
const mathjs = await import("https://cdn.jsdelivr.net/npm/mathjs@12.2.1/+esm");
const { FS } = await h5wasm.ready;

const filename = "test.h5";
// Remove any existing file with this name 
// (you don't have to do this usually, helps in an interactive demo
//  to avoid dangling files from a failed previous "run")
if (FS.isFile(filename)) FS.unlink(filename);

const file = new h5wasm.File(filename, "w");
const data_in = mathjs.range(0,14).toArray();
const dataset = file.create_dataset({name: "my_dataset", data: data_in, shape: [7,2]});

console.log("data in: ", data_in);
console.log("file keys: ", file.keys());
console.log("dataset as array: ", file.get("my_dataset").to_array());

file.close();
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

```js
const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
await h5wasm.ready;
console.log(h5wasm.FS.readdir("."));
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>
