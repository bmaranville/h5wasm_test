---
sidebar_position: 1
---

# Introduction
`h5wasm` is a zero-dependency WebAssembly-powered library for reading and writing HDF5 files from javascript.

## What it does
- Open existing HDF5 files
    - that have been fetched from the web
    - from local disk (using `<input type="file" />` elements)
- Create new HDF5 files
- Read/write Group objects (hierarchically arranged, containing other Group, Dataset objects)
- Read/write Datasets to/from Javascript native types (TypedArray)
- Read/write Attribute objects (attached to Datasets and Groups)

## Where it works
- all modern browsers with WASM support (Chrome, Safari, Firefox, Edge...)
  - random-access file read for huge files using `WORKERFS`
- server-side JS engines like Node.js, deno, bun
  - full random read/write access to local folder using `NODERAWFS` in Node.js

