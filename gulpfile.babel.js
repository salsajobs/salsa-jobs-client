const gulp        = require('gulp');
const handlebars  = require('gulp-compile-handlebars');
const browserify  = require('browserify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const sourcemaps  = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');
const connect     = require('gulp-connect');
const rename      = require('gulp-rename');
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');

const Tasks = Object.freeze({
  BUILD:   'build',
  PAGES:   'pages',
  SCRIPTS: 'scripts',
  STYLES:  'styles',
  DEFAULT: 'default',
  ICONS:   'icons',
  IMAGES:  'images',
  WATCH:   'watch',
  SERVER:  'server',
  MANIFEST:  'manifest'
});

const Paths = Object.freeze({
  SRC: './index.js',
  SOURCE: './index.js',
  DIST: './build',
  MAPS: './maps',
  SCRIPTS: './src/**/*.js',
  STYLES: ['assets/styles/*.scss', 'assets/styles/**/*.scss'],
  STYLE_DIST: 'assets/style.css',
  PARTIALS_DIR: './src/partials',
  PARTIALS: './src/partials/*.hbs',
  MAIN_FILES: './src/views/*.hbs',
  ICONS_SOURCE: 'assets/icons/*.png',
  ICONS_DIST: './build/assets/icons/',
  IMAGES_SOURCE: 'assets/images/*.png',
  IMAGES_DIST: './build/assets/images/',
  MAIN_STYLE_FILE: 'assets/styles/main.scss',
  DIST_FILE: 'index.html',
  MANIFEST_SRC: './src/salsa.webmanifest',
  MANIFEST_DEST: './build',
});

const BabelConfig = Object.freeze({
  only: /^(?:.*\/node_modules\/(?:a|b)\/|(?!.*\/node_modules\/)).*$/,
  presets: ['es2015'],
  plugins: ['transform-object-rest-spread'],
  global: true
});

const BrowserifyConfig = Object.freeze({
  entries: Paths.SRC,
  debug: true
});

const Transforms = Object.freeze({
  BABELIFY: 'babelify'
});

gulp.task(Tasks.PAGES, function () {
  const data = {
    title: 'Salsa Jobs'
  };

  const options = {
      batch : [ Paths.PARTIALS_DIR ],
      helpers : {
          capitals : function(str){
              return str.toUpperCase();
          }
      }
  };

  return gulp.src(Paths.MAIN_FILES)
    .pipe(handlebars(data, options))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(Paths.DIST));
});

gulp.task(Tasks.SCRIPTS, function () {
    return browserify(BrowserifyConfig)
      .transform(Transforms.BABELIFY, BabelConfig)
      .bundle()
      .pipe(source(Paths.SOURCE))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write(Paths.MAPS))
      .pipe(gulp.dest(Paths.DIST));
});

gulp.task(Tasks.STYLES, function() {
  return gulp.src(Paths.MAIN_STYLE_FILE)
  .pipe(sass())
  .pipe(concat(Paths.STYLE_DIST))
  .pipe(gulp.dest(Paths.DIST));
});

gulp.task(Tasks.ICONS, function() {
  return gulp.src(Paths.ICONS_SOURCE)
  .pipe(gulp.dest(Paths.ICONS_DIST));
});

gulp.task(Tasks.IMAGES, function() {
  return gulp.src(Paths.IMAGES_SOURCE)
  .pipe(gulp.dest(Paths.IMAGES_DIST));
});

gulp.task(Tasks.MANIFEST, function() {
  return gulp.src(Paths.MANIFEST_SRC)
  .pipe(gulp.dest(Paths.MANIFEST_DEST));
});

gulp.task(Tasks.BUILD, [
  Tasks.PAGES,
  Tasks.ICONS,
  Tasks.IMAGES,
  Tasks.SCRIPTS,
  Tasks.STYLES,
  Tasks.MANIFEST,
]);

gulp.task(Tasks.WATCH, [ Tasks.BUILD ], function () {
  livereload.listen();
  gulp.watch(
    [
      Paths.SOURCE,
      Paths.SCRIPTS,
      Paths.STYLES,
      Paths.PARTIALS,
      Paths.MAIN_FILES
    ],[
      Tasks.BUILD
    ]
  );
});

gulp.task(Tasks.SERVER, function() {
  connect.server({
    root: './build',
    port: 8883
  });
});

gulp.task(Tasks.DEFAULT, [
  Tasks.BUILD,
  Tasks.SERVER,
  Tasks.WATCH
]);
