var gulp = require('gulp'),
	shell = require('gulp-shell');

gulp.task('tiles', function() {
	return gulp.src('maps/**/map.jpg', { read: false })
		.pipe(shell([
			'echo "Processing <%= file.path %>..."',
			'rm -rf $(dirname <%= file.path %>)/tiles; mkdir $(dirname <%= file.path %>)/tiles',
			'convert <%= file.path %> -crop 256x256 -set filename:tile "%[fx:page.x/256]-%[fx:page.y/256]" -background none -extent 256x256 "$(dirname <%= file.path %>)/tiles/%[filename:tile].png"'
		]));
});

gulp.task('mapdata', shell.task([
	'php update.php'
]));