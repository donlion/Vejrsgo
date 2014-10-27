var PATH = {};

/*
*   INPUT PATHS
*/
PATH.src = {};
PATH.src.dir = ['../resources'];
PATH.src.sass = ['sass/**/*.scss'];
PATH.src.js = ['js/**/*.js'];
PATH.src.img = ['img/**/*.jpg', 'img/**/*.png', 'img/**/*.gif', 'img/**/*.svg', 'img/**/*.ico'];
PATH.src.fonts = ['fonts/*.eot', 'fonts/*.svg', 'fonts/*.ttf', 'fonts/*.woff'];
PATH.src.html = ['html/*.html'];

/*
*   OUTPUT PATHS
*/
PATH.css_build_dirs = ['../resources/css'];
PATH.js_build_dirs = ['../resources/js'];
PATH.img_build_dirs = ['../resources/img'];
PATH.fonts_build_dirs = ['../resources/fonts'];
PATH.html_build_dirs = ['../'];


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
//var sass = require('gulp-ruby-sass');
var include = require('gulp-include');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var minifyCSS = require('gulp-minify-css');
var merge = require('merge-stream');

gulp.task('clean', function () {
    return gulp.src(PATH.src.dir)
      .pipe(clean({force:true}));
});
gulp.task('styles', function () {
    var _merge = new merge();
    PATH.css_build_dirs.forEach(function (dir) {
        _merge.add(gulp.src('sass/app.scss')
            .pipe(sass({ outputStyle: 'nested', errLogToConsole: true, includePaths: ['bower_components/foundation/scss'] }))
		    .pipe(gulp.dest(dir)));
        _merge.add(gulp.src('sass/angular-material.scss')
            .pipe(sass({ outputStyle: 'nested', errLogToConsole: true, includePaths: ['bower_components/foundation/scss'] }))
            .pipe(gulp.dest(dir)));
    });
    return _merge;
});
gulp.task('styles:min', ['styles'], function () {
    var _merge = new merge();
    PATH.css_build_dirs.forEach(function (dir) {
        _merge.add(gulp.src(dir + '/app.css')
	        .pipe(minifyCSS())
            .pipe(rename({ suffix: '.min' }))
	        .pipe(gulp.dest(dir)));
    });
    return _merge;
});
gulp.task('scripts', function(){
	var _merge = new merge();
	PATH.js_build_dirs.forEach(function (dir) {
	    _merge.add(gulp.src('js/app.js')
            .pipe(include())
		    .pipe(gulp.dest(dir)));
	});
	return _merge;
});
gulp.task('scripts:min', ['scripts'], function () {
    var _merge = new merge();
    PATH.js_build_dirs.forEach(function (dir) {
        _merge.add(gulp.src(dir + '/app.js')
	    .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
	    .pipe(gulp.dest(dir)));
    });
    return _merge;
});
gulp.task('images', function () {
    var _merge = new merge();
    PATH.img_build_dirs.forEach(function (dir) {
        _merge.add(gulp.src(PATH.src.img)
          .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
          .pipe(gulp.dest(dir)));
    });
    return _merge;
});
gulp.task('fonts', function () {
    var _merge = new merge();
    PATH.fonts_build_dirs.forEach(function (dir) {
        _merge.add(gulp.src(PATH.src.fonts)
        .pipe(gulp.dest(dir)));
    });
    return _merge;    
});
gulp.task('html', function () {
    var _merge = new merge();
    PATH.html_build_dirs.forEach(function (dir) {
        _merge.add(gulp.src(PATH.src.html)
            .pipe(include())
	        .pipe(gulp.dest(dir)));
    });
    return _merge;
});

gulp.task('build', ['clean'], function () {
    gulp.start('scripts', 'styles', 'images', 'fonts', 'html');    
});
gulp.task('default', function () {
    gulp.start('build');
});
gulp.task('package', ['build'], function () {
    gulp.start('styles:min', 'scripts:min');
});

gulp.task('watch', ['clean', 'build'], function () {
    gulp.watch(PATH.src.sass, ['styles']);
    gulp.watch(PATH.src.js, ['scripts']);
    gulp.watch(PATH.src.img, ['images']);
    gulp.watch(PATH.src.fonts, ['fonts']);
	gulp.watch(['html/**/*.html'], ['html']);
});
