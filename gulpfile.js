var gulp 		= require('gulp'),
		rimraf 	= require('rimraf'),
		git 		= require('gulp-git'),
		del			= require('del');


/**
 * Task: Clone
 */
gulp.task('git:clone', function(cb){
	git.clone('https://github.com/gengojs/docs/', function (error) {
		cb();
	});
});

/**
 * Task: Move
 */
gulp.task('move:docs:html',['git:clone'], function(){
	return gulp.src('docs/dist/html/*.ejs')
	.pipe(gulp.dest('views/partials/'));
});

gulp.task('move:docs:json',['git:clone'], function(){
	return gulp.src('docs/dist/json/*.json')
	.pipe(gulp.dest('locales/'));
});


/**
 * Task: Clean
 */
gulp.task('clean:docs', function(cb){
	rimraf('docs/',cb);
});

gulp.task('clean:docs:clone',['git:clone'], function(cb){
	rimraf('docs/',cb);
});

gulp.task('clean:locales', function(cb){
	rimraf('locales/',cb);
});

gulp.task('clean:templates', function(){
	var views = 'views/partials/';
	return del([
		views + 'api.ejs',
		views + 'intro.ejs'
		]);
});

gulp.task('default', ['git:clone', 'move:docs:html', 'move:docs:json', 'clean:docs:clone']);

gulp.task('clean', ['clean:docs', 'clean:locales', 'clean:docs']);