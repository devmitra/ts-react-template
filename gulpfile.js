/* jshint node:true*/
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var webpack = require("webpack");
var gutil = require("gulp-util");
var webpackConfig = require("./webpack.config.js");


// Gulp Tasks
// Copying all lib css to vendor css into lib dir
gulp.task('vendor-style', function () {
    return gulp.src('./node_modules/bootstrap/dist/css/*.css')
        .pipe($.autoprefixer({ browsers: ['last 4 versions', '> 5%']}))
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest('./www/lib/style/'));
});

// Copy font from bootstrap
gulp.task('vendor-font', function () {
    return gulp.src('./node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./www/lib/fonts/'));
});

// Copying app css file to lib file
gulp.task('style', function () {
    return gulp.src('./sources/styles/*.css')
        .pipe($.autoprefixer({ browsers: ['last 4 versions', '> 5%']}))
        .pipe($.concat('app.main.css'))
        .pipe(gulp.dest('./www/lib/style/'));
});



// Scheuduling webpack taske to proccess and unify js file
gulp.task('webpack', function (callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

// Copying index.html to wwww
gulp.task('html-index-copy', function () {
    return gulp.src('./sources/index.html')
        .pipe(gulp.dest('./www/'));
});

// Copying favicon to www
gulp.task("favicon-copy", function () {
    return gulp.src('./resources/favicon/favicon.ico')
        .pipe(gulp.dest('./www/'));
});

// Copy assets
gulp.task('asset-copy', function () {
    return gulp.src('./resources/assets/**')
        .pipe(gulp.dest('./www/assets/'));
});

var taskList = ['vendor-style', 'vendor-font', 'style', 'webpack', 'html-index-copy', 'favicon-copy', 'asset-copy'];

gulp.task('default', taskList);