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

<h3 style={{'font-weight': 'normal'}}>_Note that in all examples below the execution context has been pre-initialized with an empty h5wasm.File object named 'file'_</h3>

### Create dataset with auto-guessed dtype and shape
```js
// shape and dtype will match input if omitted
file.create_dataset({name: "auto", data: [3.1, 4.1, 0.0, -1.0]});
console.log("shape: ", file.get("auto").shape);
console.log("dtype: ", file.get("auto").dtype);
console.log("value: ", Array.from(file.get("auto").value));
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Create Float32 dataset
```js
file.create_dataset({name: "float_data", data: [3.1, 4.1, 0.0, -1.0], dtype: '<f'});
console.log("dtype: ", file.get("float_data").dtype);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Specify a shape
```js
file.create_dataset({name: "square_data", data: [3.1, 4.1, 0.0, -1.0], shape: [2,2], dtype: '<d'});
console.log("shape: ", file.get("square_data").shape);
console.log("to_array: ", file.get("square_data").to_array());
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Create a dataset with compression
```js
const long_data = [...new Array(1000000)].map((_, i) => i);
file.create_dataset({name: "compressed", data: long_data, shape: [1000, 1000], dtype: '<f', chunks: [100,100], compression: 9});
// equivalent to:
// file.create_dataset({name: "compressed", data: long_data, shape: [1000, 1000], dtype: '<f', chunks=[100,100], compression='gzip', compression_opts=[9]});
console.log("filters: ", file.get("compressed").filters);
console.log("slice: ", file.get("compressed").slice([[2,3],[0,5]]));
console.log("native type: ", file.get("compressed").value.constructor.name);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Create an attribute 
(creates a VLEN string by default for a string)
```js
file.create_attribute("myattr", "a string");
console.log("attr keys:", Object.keys(file.attrs));
console.log("myattr: ", file.attrs["myattr"].value);
console.log("myattr dtype: ", file.attrs["myattr"].dtype);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Create fixed-length string attributes
```js
file.create_attribute("fixed", ["hello", "you"], null, "S5");
console.log("fixed: ", file.attrs["fixed"].value);
console.log("fixed dtype: ", file.attrs["fixed"].dtype);
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>

### Close File object
If opened in `append` or `write` mode, all objects are flushed (commited to the file).
Reading and writing will no longer work, all datasets and objects are closed.
```js
file.close();
console.log(Object.keys(file.attrs));
```
<codapi-snippet sandbox="javascript" editor="basic" init-delay="500" template="/code/blank_file.js">
</codapi-snippet>