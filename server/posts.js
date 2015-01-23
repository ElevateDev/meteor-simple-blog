Meteor.publish("BlogPost", function( id ){
  var post = Posts.findOne({'_id': id});
  var author = Meteor.users.find({'_id': post.authorId},{fields: {'profile.name': 1}});
  return [Posts.find({'_id': id}), author];
});

Meteor.publish("BlogPosts", function(){
  var posts = Posts.find();
  var authorIds = posts.map(function(p){ return p.authorId });
  var authors = Meteor.users.find({'_id': {$in: authorIds}},{fields: {'profile.name': 1}});
  return [posts, authors];
});
