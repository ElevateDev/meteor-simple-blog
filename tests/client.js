Tinytest.add('Post - Should autofill author based on current user on insert', function (test) {
  var schema = new SimpleSchema(Blog.postsSchema);
  var userId = Random.id();
  Meteor.userId = function(){ return userId; }
  var post = {title: "Test", description: "test", body: "test"};
  schema.clean(post,{extendAutoValueContext: {isInsert: true}});
  test.equal(post.authorId, userId, 'Expected authorId to be automatically set');
});

Tinytest.add('Post - Published date should auto fill when published is set true', function (test) {
  var schema = new SimpleSchema(Blog.postsSchema);
  var userId = Random.id();
  Meteor.userId = function(){ return userId; }
  var post = {title: "Test", description: "test", body: "test", published: true};
  var beforeClean = moment();
  schema.clean(post,{extendAutoValueContext: {isInsert: true}});
  var afterClean = moment();
  test.equal(!beforeClean.isAfter(post.publishedDate), true, 'Cleaned publishedDate value should be set to current time');
  test.equal(!afterClean.isBefore(post.publishedDate), true, 'Cleaned publishedDate value should be set to current time');
});

/* 
 * I'm not sure if this is an effective test
 */
Tinytest.add('Post - Published date should not change after its already published', function (test) {
  var schema = new SimpleSchema(Blog.postsSchema);
  var userId = Random.id();
  Meteor.userId = function(){ return userId; }
  var originalMoment = moment().add(-1, 'days');
  var post = {title: "Test", description: "test", body: "test", published: true, publishedDate: originalMoment};
  schema.clean(post);
  test.equal(moment(post.publishedDate).isSame(originalMoment), true, 'Published date should not change after initially set.');
});
