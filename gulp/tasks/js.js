import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import store from '../store.js';
import browserSync from 'browser-sync';

import postcssAutoprefixer from 'autoprefixer';
import postcssCamelCase from 'postcss-camel-case';
import postcssNested from 'postcss-nested';
import postcssLocal from 'postcss-modules-local-by-default';

const $ = gulpLoadPlugins();

gulp.task('js', () => {
  rebundle(false);

  if (store.isWatching()) {
    $.watch('src/scripts/**/*', rebundle);
  }
});

function rebundle(_firedByWatch) {
  const firedByWatch = typeof _firedByWatch === 'boolean' ? _firedByWatch : true;

  const options = {
    entry: {
      'controller.js': './src/scripts/controller/controller.js',
      'stage.js': './src/scripts/stage/stage.js',
      'admin.js': './src/scripts/admin.js',
      'controllerBeforeLive.js': './src/scripts/controller/controllerBeforeLive.js',
      'controllerAfterLive.js': './src/scripts/controller/controllerAfterLive.js',
      'stageBeforeLive.js': './src/scripts/stage/stageBeforeLive.js',
      'stageAfterLive.js': './src/scripts/stage/stageAfterLive.js'
    },
    output: {
      path: './dist/assets/scripts',
      filename: '[name]'
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.css$/,
          loader: 'style!css!postcss',
          exclude: /node_modules/
        }
      ]
    },
    postcss: () => ({
      defaults: [
        postcssAutoprefixer,
        postcssCamelCase,
        postcssNested,
        postcssLocal
      ]
    }),
    resolve: {
      extensions: ['', '.js']
    },
    plugins: [],
    progress: true,
    cache: true,
    devtool: store.isDevelopment() ? 'inline-source-map' : ''
  };

  store.isDevelopment() && (options.devtool = 'inline-source-map');
  store.isProduction() && options.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));

  webpack(options, (err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    store.isWatching() && firedByWatch && browserSync.reload();

    const jsonStats = stats.toJson();
    if (jsonStats.errors.length) {
      jsonStats.errors.forEach(error => $.util.log($.util.colors.bgRed('webpack:error'), $.util.colors.magenta(error)));
      return;
    }
    if (jsonStats.warnings.length) {
      jsonStats.warnings.forEach(warning => $.util.log($.util.colors.bgRed('webpack:warning'), $.util.colors.magenta(warning)));
      return;
    }

    $.util.log('webpack', stats.toString({
      hash: false,
      version: false,
      chunks: false,
      reasons: true,
      colors: true
    }));
  });
}
