var gulp = require('gulp'),
	shell = require('gulp-shell');

gulp.task('tiles', function() {
	return gulp.src('maps/**/map.jpg', { read: false })
		.pipe(shell([
			'rm -rf <%= getDirectory(file.path) %>/z3',
			'mkdir <%= getDirectory(file.path) %>/z3',
			'convert <%= file.path %> -crop 256x256 -set filename:tile "%[fx:page.x/256]x%[fx:page.y/256]" "<%= getDirectory(file.path) %>/z3/%[filename:tile].jpg"'
		], {
			templateData: {
				getDirectory: function(s) {
					return s.replace(/\/map\.jpg$/, '');
				}
			}
		}));
});
