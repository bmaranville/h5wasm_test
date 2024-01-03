const h5wasm = await import("https://cdn.jsdelivr.net/npm/h5wasm@latest/dist/esm/hdf5_hl.js");
const { FS } = await h5wasm.ready;
const temp_filename = `temp_${Date.now()}.h5`;

//if (window.new_file && window.new_file.close) window.new_file.close();
if (FS.isFile(temp_filename)) FS.unlink(temp_filename);

console.log("hello");
const file = new h5wasm.File(temp_filename, "w");
console.log("filename:", file.filename)

##CODE##

file.close()
FS.unlink(temp_filename);