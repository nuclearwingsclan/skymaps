var gulp = require('gulp'),
	shell = require('gulp-shell');

gulp.task('assets', function() {
	return gulp.src([
			'bower_components/leaflet/dist/leaflet.css',
			'bower_components/Leaflet.label/dist/leaflet.label.css',
			'bower_components/requirejs/require.js',
			'bower_components/backbone/backbone.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/leaflet/dist/leaflet.js',
			'bower_components/Leaflet.label/dist/leaflet.label.js',
			'bower_components/underscore/underscore-min.js'
		]).pipe(gulp.dest('public/assets/'));
});

gulp.task('update', ['fetch'], function() {
	return gulp.src('skymaps-data/*/*/{mapdata.json,tiles/**/*,minimap.jpg}')
		.pipe(gulp.dest('public/maps/'));
});

gulp.task('tiles', function() {
	return gulp.src('skymaps-data/**/map.jpg', { read: false })
		.pipe(shell([
			'echo "Processing <%= file.path %>..."',
			'rm -rf $(dirname <%= file.path %>)/tiles; mkdir $(dirname <%= file.path %>)/tiles',
			'convert <%= file.path %> -crop 256x256 -set filename:tile "%[fx:page.x/256]-%[fx:page.y/256]" -background none -extent 256x256 "$(dirname <%= file.path %>)/tiles/%[filename:tile].png"'
		]));
});

gulp.task('fetch', shell.task([
	'php skymaps-data/update.php'
]));