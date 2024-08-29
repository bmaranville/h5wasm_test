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
