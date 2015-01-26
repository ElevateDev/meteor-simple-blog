Tinytest.add('Post - Should autofill author based on current user on insert', function (test) {
  var schema = new SimpleSchema(Blog.postsSchema);
  var userId = Random.id();
  Meteor.userId = function(){ return userId; }
  var post = {title: "Test", description: "test", body: "test"};
  schema.clean(post,{extendAutoValueContext: {isInsert: true}});
  test.equal(post.authorId, userId, 'Expected authorId to be automatically set');
});
