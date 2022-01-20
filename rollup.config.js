import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import livereload from 'rollup-plugin-livereload';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import watch from 'rollup-plugin-watch';
import { minify } from 'html-minifier';
import { terser } from 'rollup-plugin-terser';

const dev = process.env.NODE_ENV === 'development';
const liveReloadPort = 35729;

// all the html files
function buildHtml(port, host) {
  const htmlFiles = getAllFilesRecursively(path.resolve('./', 'src/'))
    .filter((p) => /\.html$/.test(p))
    .map((p) => path.relative('./', p));

  htmlFiles.forEach(async (p) => {
    let src = fs.readFileSync(path.resolve('./', p), 'utf8');
    if (port) {
      const script = `<script src='http://${
        (host || 'localhost').split(':')[0]
      }:${port}/livereload.js?snipver=1'></script>`;
      src = src.replace(/<head>/, '<head>' + script);
    }
    const minified = await minify(src, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true
    });
    const distPath = path.resolve('./', p.replace(/^src/, 'dist'));
    await fs.mkdir(path.dirname(distPath), { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFileSync(distPath, minified);
  });
}

function htmlPlugin(port) {
  return {
    name: 'htmlPlugin',
    buildEnd() {
      buildHtml(port);
      return null;
    }
  };
}

// all the typescript files
function getAllFilesRecursively(directory, files = []) {
  fs.readdirSync(directory).forEach((file) => {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory())
      return getAllFilesRecursively(absolute, files);
    else return files.push(absolute);
  });
  return files;
}

const tsFiles = getAllFilesRecursively(path.resolve('./', 'src/'))
  .filter((p) => /\.ts$/.test(p) && !/\.d\.ts$/.test(p) && !/\/_.*/.test(p))
  .map((p) => path.relative('./', p));

const tsConfigs = tsFiles.map((p, i) => {
  return {
    input: p,
    output: {
      file: p.replace(/^src/, 'dist').replace(/\.ts$/, '.js'),
      sourcemap: true,
      format: 'cjs',
      exports: 'auto'
    },
    plugins: [
      watch({ dir: 'src/view' }),
      typescript(),
      commonjs(),
      terser(),
      i === 0 && htmlPlugin(dev ? liveReloadPort : undefined),
      dev &&
        i === tsFiles.length - 1 &&
        livereload({
          delay: 1000,
          port: liveReloadPort,
          watch: 'src',
          verbose: false
        })
    ]
  };
});

export default tsConfigs;
