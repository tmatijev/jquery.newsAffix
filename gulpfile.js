var gulp = require('gulp');
var sass = require('gulp-sass');

// ************************************************ //
// --- Tasks
// ************************************************ //

gulp.task('sass', function() {
	return gulp.src('scss/main.scss')
	    .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

// ************************************************ //
// --- Watchers
// ************************************************ //

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('./scss/*.scss', ['sass']);
});

// ************************************************ //
// --- Executors
// ************************************************ //

// Default Watcher
gulp.task('dev', ['sass', 'watch']);

