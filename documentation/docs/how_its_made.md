---
sidebar_position: 2
---

# How it's made
## Lower-level library: C++
This is statically linked at build time to the full 
[HDF5 C API](https://docs.hdfgroup.org/archive/support/HDF5/doc/RM/RM_H5Front.html)
(which has been built in WebAssembly in the [libhdf5-wasm](https://github.com/usnistgov/libhdf5-wasm) project)

## Higher-level library: TypeScript
A higher-level library is written in TypeScript, which uses the C++ WASM module described above.
This library provides functions for easily reading and writing HDF5 File, Group, Dataset and Attribute
objects using Javascript-native inputs and outputs.

### distribution
The results are bundled as `esm` modules, with specialized builds for 
- browsers (with random-access filesystem for Web Worker use)
- Node.js (with read/write access to local filesystem through `NODERAWFS`)

- as well as an `iife` build for older browsers not supporting `esm` (though this will likely be 
dropped in the future, as `esm` support is nearly universal)

Which are published through [npmjs](https://www.npmjs.com/package/h5wasm) for each new release, 
with no required runtime dependencies (additional compression plugins are available in a separate package)

## Contributing
`h5wasm` is an open-source collaboration, and new contributors are welcome.  The project is 
hosted on [github](https://github.com/usnistgov/h5wasm).  See [developer notes](https://github.com/usnistgov/h5wasm/DEVELOPER.md) for
more information.