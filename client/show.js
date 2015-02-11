Template.blogPost.helpers({
  post: function(){
    return Posts.findOne(Blog._showing.get());
  },
  afterTitle: function(){
    return Blog.showAfterTitle;
  },
  afterBody: function(){
    return Blog.showAfterBody;
  }
});
