var gulp = require('gulp'),
	jscs = require('gulp-jscs'),
	jshint = require('gulp-jshint'),
	amdOptimize = require('amd-optimize'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	inject = require('gulp-inject'),
	shell = require('gulp-shell');

gulp.task('lint', function() {
	return gulp.src('src/**/*.js')
		.pipe(jscs({ configPath: 'build/jscsrc.json' }))
		.pipe(jshint({ configPath: 'build/jshintrc.json' }));
});

gulp.task('public', function() {
	return gulp.src(['src/**/*', 'src/.htaccess'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('compile', ['public'], function() {
	gulp.src('dist/assets/require.js').pipe(gulp.dest('dist/'));
	gulp.src('dist/index.html')
		.pipe(inject(gulp.src(['dist/templates/*.tpl', 'dist/data/*.json']), {
			removeTags: true,
			transform: function(filePath, file) {
				var fileName = filePath.replace(/^\/(.+\/)*(.+)\.(.+)$/, '$2');
					fileExt = filePath.replace(/^\/(.+\/)*(.+)\.(.+)$/, '$3');
				switch (fileExt) {
					case 'tpl': return '<script id="' + fileName + '" type="text/template">' + file.contents.toString('utf8') + '</script>';
					case 'json': return '<script>var ' + fileName + 'EmbedData = ' + file.contents.toString('utf8') + ';</script>';
				}
			}
		})).pipe(gulp.dest('dist/'));
	return gulp.src('dist/{js,assets}/**/*.js', { base: 'dist/js' })
		.pipe(amdOptimize('bootstrap', { configFile: 'build/requirejsrc.js' }))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('concat:js', function() {
	return gulp.src('dist/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('concat:css', function() {
	return gulp.src('dist/**/*.css')
		.pipe(concat('app.css'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('uglify:js', function() {
	return gulp.src('dist/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});

gulp.task('assets', function() {
	return gulp.src([
			'bower_components/leaflet/dist/leaflet.css',
			'bower_components/Leaflet.label/dist/leaflet.label.css',
			'bower_components/requirejs/require.js',
			'bower_components/backbone/backbone.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/leaflet/dist/leaflet.js',
			'bower_components/jquery-ui/jquery-ui.min.js',
			'bower_components/Leaflet.label/dist/leaflet.label.js',
			'bower_components/rrose/rrose-src.js',
			'bower_components/rrose/leaflet.rrose.css',
			'bower_components/underscore/underscore-min.js',
			'bower_components/tinyscrollbar/lib/jquery.tinyscrollbar.min.js'
		]).pipe(gulp.dest('dist/assets/'));
});

gulp.task('data', function() {
	return gulp.src('data/*/*/mapdata.json')
		.pipe(gulp.dest('dist/maps/'));
});

gulp.task('tiles', function() {
	return gulp.src('tiles/*/*/{tiles/**/*,minimap.jpg}')
		.pipe(gulp.dest('dist/maps/'));
});

gulp.task('init', ['public', 'assets', 'data', 'tiles']);
gulp.task('build', [/*'lint',*/ 'compile']);
gulp.task('update', ['data', 'tiles']);
//gulp.task('optimize', ['uglify', 'concat']);
//gulp.task('production', ['build', 'optimize', 'deploy']);