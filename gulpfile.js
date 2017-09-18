//Include required modules
var gulp        = require("gulp"),
    babelify    = require("babelify"),
    browserify  = require("browserify"),
    connect     = require("gulp-connect"),
    source      = require("vinyl-source-stream")
    buffer      = require("vinyl-buffer")
    sass        = require("gulp-sass")
    minifyCSS   = require("gulp-minify-css")
    minifyJS    = require("gulp-uglify")
    ;

//Copy static html files
gulp.task("copyStaticFiles", function(){
  return gulp.src("./src/html/*.*")
    .pipe(gulp.dest("./dist"))
});

// Copy videos
gulp.task("copyVideos", function(){
  return gulp.src("./vids/*.*")
    .pipe(gulp.dest("./dist/vids"))
});

//Convert ES6 in all js files in src/js folder and copy to
//build folder as bundle.js
gulp.task("js", function(){
  return browserify({
      entries: ["./src/js/index.js"]
    })
    .transform(babelify.configure({
      presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(minifyJS())
    .pipe(gulp.dest("./dist/js"));
});

// Convert SCSS files to plain css
gulp.task("css", function() {
  gulp.src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest("./dist/css"));
});


//Default task
gulp.task("default", function() {
  // We watch for changes in those files and rebundle them if needed
  gulp.watch("./src/html/*.html", ["copyStaticFiles"]);
  gulp.watch("./src/scss/*.scss",["css"]);
  gulp.watch("./src/js/*.js", ["js"]);

  // On init - we do everything
  gulp.start(["js", "css", "copyStaticFiles", "copyVideos", "startServer"]);
});


//Start a test server with doc root at build folder and
//listening to 9001 port. Home page = http://localhost:9001
gulp.task("startServer", function(){
  connect.server({
    root : "./dist",
    livereload : true,
    port : 9001
  });
});



