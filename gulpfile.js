var gulp = require('gulp'),
	shell = require('gulp-shell');

gulp.task('tiles', function() {
	return gulp.src('maps/**/map.jpg', { read: false })
		.pipe(shell([ 'sh maps/tiles.sh <%= file.path %>' ]));
});

gulp.task('mapdata', shell.task([
	'php update.php'
]));