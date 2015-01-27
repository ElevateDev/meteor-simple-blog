Posts = new Mongo.Collection("blog_posts");

Blog.postsSchema = {
  title: {
    type: String,
    max: 200
  },
  description: {
    type: String,
    max: 500
  },
  authorId: {
    type: SimpleSchema.RegEx.Id,
    autoValue: function(){
      if( this.isInsert ){
        return Meteor.userId();
      }else if( this.isUpsert ){
        return {$setOnInsert: Meteor.userId()};
      }else{
        this.unset();
      }
    }
  },
  body: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 25
      }
    }
  },
  published: {
    type: Boolean,
    defaultValue: false
  },
  publishedDate: {
    type: Date,
    optional: true,
    autoValue: function(){
      if( Meteor.isServer ){
        // this.isSet doesn' appear to be working
        var post = Posts.findOne({'_id': this.docId});
        if( this.field("published").value && !post.publishedDate ){
          return moment().toDate();
        }
      }
    }
  }
}

Meteor.startup(function(){
  var PostsSchema = new SimpleSchema( Blog.postsSchema );
  Posts.attachSchema( PostsSchema );
});

Posts.allow({
  insert: function(){
    return Roles.userIsInRole(Meteor.userId(), "blog_admin", Roles.GLOBAL_GROUP);;
  },
  update: function(){
    return Roles.userIsInRole(Meteor.userId(), "blog_admin", Roles.GLOBAL_GROUP);;
  },
  remove: function(){
    return Roles.userIsInRole(Meteor.userId(), "blog_admin", Roles.GLOBAL_GROUP);;
  }
});

Posts.helpers({
  authorName: function(){
    var author = Meteor.users.findOne( this.authorId );
    if( author && author.profile ){
      return author.profile.name;
    }
  },
  publishedDateText: function(){
    if( this.publishedDate ){
      return moment(this.publishedDate).format( "MM/DD/YYYY" );
    }else{
      return "Not Published";
    }
  }
});
