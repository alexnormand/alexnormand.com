// nunjucks "dateonly" custom filter.
// e.g. {{ myDate | dateonly}} ==> 2012-05-22
module.exports = function(date) {
  var d = new Date(Date.parse(date));
  var addZero = function(n){ return n < 10 ? '0'+n : n; };
  return [d.getFullYear(), addZero(d.getMonth()+1), addZero(d.getDate())].join('-');
};

