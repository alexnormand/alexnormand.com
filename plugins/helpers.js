module.exports = function(env, callback) {
  // Returns an array of all blog posts ordered from
  // the newest to the oldest.
  env.helpers.getArticles = function(contents) {
    var articles = [];

    contents.blog._.directories.forEach(function(year) {
      year._.directories.forEach(function(month) {
        month._.directories.forEach(function(post) {
          articles.push(post.index);
        });
      });
    });

    articles = articles.filter(function(item) {
      return item.template !== 'none';
    });

    articles.sort(function(a, b) {
      return b.date - a.date;
    });

    return articles;
  };

  callback();
};
