var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// ************************************************ //
// --- Tasks
// ************************************************ //

gulp.task('sass', function() {
	return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'Android >= 2.3',
                'BlackBerry >= 7',
                'Chrome >= 9',
                'Firefox >= 4',
                'Explorer >= 9',
                'iOS >= 5',
                'Opera >= 11',
                'Safari >= 5',
                'OperaMobile >= 11',
                'OperaMini >= 6',
                'ChromeAndroid >= 9',
                'FirefoxAndroid >= 4',
                'ExplorerMobile >= 9'
            ],
            cascade: false
        }))
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

