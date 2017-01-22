var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Static server
gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
});
gulp.watch("./").on("change", reload);
gulp.watch("./res/*").on("change", reload);
