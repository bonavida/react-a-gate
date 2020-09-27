import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import includePaths from 'rollup-plugin-includepaths';

import pkg from './package.json';

const includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
};

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    sass({ insert: true }),
    typescript({ objectHashIgnoreUnknownHack: true }),
    includePaths(includePathOptions),
  ],
  external: ['react', 'react-dom'],
};
