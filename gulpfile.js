const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const del = require("del");
const svgstore = require("gulp-svgstore");

// HTML

const minHTML = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

exports.minHTML = minHTML;

// Styles

const minStyles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.minStyles = minStyles;

// Scripts

const minScripts = () => {
  return gulp
    .src("source/js/menu.js")
    .pipe(terser())
    .pipe(rename("menu.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

exports.minScripts = minScripts;

// Styles not minified to source folder
const notMinStyles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
};

exports.notMinStyles = notMinStyles;

// Optimize images

const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

exports.optimizeImages = optimizeImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/webp"))
}

exports.createWebp = createWebp;

// Copy images

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}").pipe(gulp.dest("build/img"));
};

exports.copyImages = copyImages;

// CopyFiles

const copyFiles = (done) => {
  gulp
    .src(
      [
        "source/fonts/*.{woff2,woff}",
        "source/*.ico",
        "source/img/**/*.svg",
        "source/manifest.*",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
  done();
};

exports.copyFiles = copyFiles;

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch(
    "source/sass/**/*.scss",
    gulp.series("minStyles", "notMinStyles")
  );
  gulp.watch("source/js/menu.js", gulp.series("minScripts"));
  gulp
    .watch("source/*.html", gulp.series("minHTML"))
    .on("change", sync.reload);
};

// Build

const build = gulp.series(
  clean,
  copyFiles,
  optimizeImages,
  gulp.parallel(minHTML, minStyles, minScripts, createWebp)
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copyFiles,
  copyImages,
  gulp.parallel(minHTML, minStyles, minScripts, createWebp),
  gulp.series(server, watcher)
);
