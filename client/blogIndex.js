Template.blogIndex.helpers({
  posts: function(){
    return Posts.find({},{sort: {"publishedDate": -1}});
  }
});
