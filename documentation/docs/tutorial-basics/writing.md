---
sidebar_position: 1
---
# Writing

### Creating new File object
```js
const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
const { FS } = await h5wasm.ready;
const filename = "myfile.h5";

if (window.new_file && window.new_file.close) window.new_file.close();
if (FS.isFile(filename)) FS.unlink(filename);

new_file = new h5wasm.File("myfile.h5", "w");
new_file.create_group("entry");
console.log(new_file.keys());
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### Create dataset with auto-guessed dtype and shape
```js

// shape and dtype will match input if omitted
file.get("entry").create_dataset({name: "auto", data: [3.1, 4.1, 0.0, -1.0]});
console.log("shape: ", file.get("entry/auto").shape);
console.log("dtype: ", file.get("entry/auto").dtype);
console.log("value: ", file.get("entry/auto").value);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Create Float32 dataset
```js
new_file.get("entry").create_dataset({name: "data", data: [3.1, 4.1, 0.0, -1.0], dtype: '<f'});
console.log("dtype: ", new_file.get("entry/auto").dtype);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### Specify a shape
```js
new_file.get("entry").create_dataset({name: "square_data", data: [3.1, 4.1, 0.0, -1.0], shape: [2,2], dtype: '<d'});
console.log("shape: ", new_file.get("entry/square_data").shape);
console.log("to_array: ", new_file.get("entry/square_data").to_array());
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### Create a dataset with compression
```js
const long_data = [...new Array(1000000)].map((_, i) => i);
new_file.get("entry").create_dataset({name: "compressed", data: long_data, shape: [1000, 1000], dtype: '<f', chunks: [100,100], compression: 9});
// equivalent to:
// new_file.get("entry").create_dataset({name: "compressed", data: long_data, shape: [1000, 1000], dtype: '<f', chunks=[100,100], compression='gzip', compression_opts=[9]});
console.log("filters: ", new_file.get("entry/compressed").filters);
console.log("slice: ", new_file.get("entry/compressed").slice([[2,3],[0,5]]));
console.log("native type: ", new_file.get("entry/compressed").value.constructor.name);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### Create an attribute 
(creates a VLEN string by default for a string)
```js
new_file.get("entry").create_attribute("myattr", "a string");
console.log("attr keys:", Object.keys(new_file.get("entry").attrs));
console.log("myattr: ", new_file.get("entry").attrs["myattr"].value);
console.log("myattr dtype: ", new_file.get("entry").attrs["myattr"].dtype);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### Create fixed-length string attributes
```js
new_file.get("entry").create_attribute("fixed", ["hello", "you"], null, "S5")
console.log("fixed: ", new_file.get("entry").attrs["fixed"].value);
console.log("fixed dtype: ", new_file.get("entry").attrs["fixed"].dtype);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>

### Close File object
Reading and writing will no longer work, all datasets and objects are closed
```js
new_file.close()

```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500">
</codapi-snippet>