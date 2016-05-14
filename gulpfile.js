// Include gulp
var gulp 		= require('gulp');

// Define base folders
var cssResources = 'scss/';
var dest 		 = 'public/';

// Include plugins
var uglify 		= require('gulp-uglify');
var rename 		= require('gulp-rename');
var cache 		= require('gulp-cache');
var sass 		= require('gulp-ruby-sass');

// ************************************************ //
// --- Minimized and for showcase
// ************************************************ //

gulp.task('sass-main', function() {
    return sass('scss/main.scss')
        .pipe(gulp.dest('public/css'));
});

// gulp.task('sass-main', function() {
//     return sass('stylesheets/coach.scss')
//         .pipe(gulp.dest('public/css'));
// });

// ************************************************ //
// --- Directly for production
// ************************************************ //

// gulp.task('sass-production', function() {
//     return sass('resources/scss/style.scss')
//         .pipe(gulp.dest('production/css'));
// });

// gulp.task('scripts-production', function() {
//     gulp.src(jsFiles)
//         .pipe(concat('script.js'))
//         .pipe(gulp.dest('./production/js/'))
// });

// ************************************************ //
// --- Watchers
// ************************************************ //

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch(cssResources + 'main.scss', ['sass-main']);
});

// ************************************************ //
// --- Executors
// ************************************************ //

// Default Task
gulp.task('dev', ['sass-main', 'watch']);

// Production Task
// gulp.task('production', ['scripts-production', 'sass-production']);