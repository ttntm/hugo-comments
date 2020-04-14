var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    concatCss = require('gulp-concat-css'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    purgecss = require('gulp-purgecss'),
    request = require('request'),
    fs = require('fs'),
    config = require('dotenv').config();

var buildSrc = "./";
var buildDest = "public";

gulp.task("get-comments", function (done) {

  // set up our request with appropriate auth token and Form ID
  var url = `https://api.netlify.com/api/v1/forms/${process.env.COMMENT_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

  // Go and get the data from Netlify's submissions API
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      console.log("Submissions found");
      var body = JSON.parse(body);
      var comments = {};

      // massage the data into the shape we want,
      // and add a gravatar URL if possible
      for(var item in body){
        var data = body[item].data;

        var comment = {
          name: data.Name,
          // avatar: gravatar.url(data.email, {s: '100', r: 'x', d: 'retro'}, true),
          comment: data.Comment,
          date: body[item].created_at
        };

        // Add it to an existing array or create a new one
        if(comments[data.path]){
          comments[data.path].push(comment);
        } else {
          comments[data.path] = [comment];
        }
      }

      // write our data to a file where our site generator can get it.
      fs.writeFile(buildSrc + "data/comments.json", JSON.stringify(comments, null, 2), function(err) {
        if(err) {
          console.log(err);
          done();
        } else {
          console.log("Comments data saved.");
          done();
        }
      });

    } else {
      console.log("Couldn't get comments from Netlify");
      done();
    }
  });
});

gulp.task('procss', function () {
    return gulp.src('./src/css/page.css')
      .pipe(postcss([
        require('tailwindcss'),
        require('autoprefixer'),
      ]))
      .pipe(purgecss({
        content: ['./layouts/**/*.html','./content/**/*.md'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        whitelist: [':focus', 'button', 'button:focus'],
        whitelistPatterns: [/(:\w+)/g]
      }))
      .pipe(concatCss('page.css'))
      .pipe(cssnano({
        reduceIdents: false,
        discardComments: {removeAll: true}
      }))
      .pipe(gulp.dest('static/css/'));
});

gulp.task('watchcss', function() {
  gulp.watch('./src/css/*.css', gulp.series('procss'));
});

gulp.task('dev', gulp.series('procss','get-comments'));

gulp.task('build', gulp.series('procss','get-comments'));