import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import includePaths from 'rollup-plugin-includepaths';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

import pkg from './package.json';

const sassOptions = {
  insert: true,
  processor: (css) =>
    postcss([autoprefixer])
      .process(css, { from: undefined })
      .then((result) => result.css),
};

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
    sass(sassOptions),
    typescript(),
    includePaths(includePathOptions),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
