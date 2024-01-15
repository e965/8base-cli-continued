import { defineConfig } from 'rollup';
import glob from 'fast-glob';

import packageJson from './package.json' assert { type: 'json' };

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const inputs = await glob('src/**/*.{js,ts}');

export default defineConfig({
  input: inputs,
  output: {
    dir: 'dist',
    format: 'cjs',
    compact: false,
    sourcemap: false,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external: Object.values(packageJson.dependencies),
  plugins: [
    commonjs(),
    json(),
    typescript({ noEmitOnError: true }),
    replace({
      __packageFileName__: packageJson.name,
      __packageFileVersion__: packageJson.version,
    }),
  ],
});
