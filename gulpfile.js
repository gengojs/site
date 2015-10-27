var gulp 		= require('gulp'),
		rimraf 	= require('rimraf'),
		git 		= require('gulp-git');

gulp.task('git:clone', function(){
	git.clone('https://github.com/gengojs/docs/', function (err) {});
});

gulp.task('move:docs:html',['git:clone'], function(){
	return gulp.src('docs/dist/html/*.ejs')
	.pipe(gulp.dest('views/partials/'));
});

gulp.task('move:docs:json',['git:clone'], function(){
	return gulp.src('docs/dist/json/*.json')
	.pipe(gulp.dest('locales/'));
});

gulp.task('clean:docs', function(cb){
	rimraf('docs/',cb);
});

gulp.task('clean:locales', function(cb){
	rimraf('locales/',cb);
});

gulp.task('default', ['git:clone', 'move:docs:html', 'move:docs:json']);

gulp.task('clean', ['clean:docs', 'clean:locales']);