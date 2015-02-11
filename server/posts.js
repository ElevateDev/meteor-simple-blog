Meteor.publish("BlogPost", function( id ){
  check( id, String );
  var post = Posts.findOne({'_id': id});
  if( !post ){ return this.stop; }
  if( post && Roles.userIsInRole( this.userId, Blog.adminRole, Roles.GLOBAL_GROUP ) || post.published ){
    var author = Meteor.users.find({'_id': post.authorId},{fields: {'profile': 1}});
    return [Posts.find({'_id': id}), author];
  }
  return this.stop();
});

Meteor.publish("BlogPosts", function(){
  if( Roles.userIsInRole( this.userId, "blog_admin", Roles.GLOBAL_GROUP ) ){
    var posts = Posts.find();
    var authorIds = posts.map(function(p){ return p.authorId; });
    var authors = Meteor.users.find({'_id': {$in: authorIds}},{fields: {'profile': 1}});
    return [posts, authors];
  }else{
    var posts = Posts.find({published: true});
    var authorIds = posts.map(function(p){ return p.authorId; });
    var authors = Meteor.users.find({'_id': {$in: authorIds}},{fields: {'profile': 1}});
    return [posts, authors];
  }
});
