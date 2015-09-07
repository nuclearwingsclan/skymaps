var gulp = require('gulp'),
	jscs = require('gulp-jscs'),
	jshint = require('gulp-jshint'),
	shell = require('gulp-shell');

gulp.task('lint', function() {
	return gulp.src('src/**/*.js')
		.pipe(jscs({ configPath: 'build/jscsrc.json' }))
		.pipe(jshint({ configPath: 'build/jshintrc.json' }));
});

gulp.task('assets', function() {
	return gulp.src([
			'bower_components/leaflet/dist/leaflet.css',
			'bower_components/Leaflet.label/dist/leaflet.label.css',
			'bower_components/requirejs/require.js',
			'bower_components/backbone/backbone.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/leaflet/dist/leaflet.js',
			'bower_components/Leaflet.label/dist/leaflet.label.js',
			'bower_components/rrose/rrose-src.js',
			'bower_components/rrose/leaflet.rrose.css',
			'bower_components/underscore/underscore-min.js',
			'bower_components/tinyscrollbar/lib/jquery.tinyscrollbar.min.js'
		]).pipe(gulp.dest('dist/assets/'));
});

gulp.task('data', function() {
	return gulp.src('skymaps-data/*/*/mapdata.json')
		.pipe(gulp.dest('dist/maps/'));
});

gulp.task('tiles', function() {
	return gulp.src('tiles/*/*/{tiles/**/*,minimap.jpg}')
		.pipe(gulp.dest('dist/maps/'));
});