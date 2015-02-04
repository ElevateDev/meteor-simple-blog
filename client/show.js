Template.blogPost.subscriptions = function(){
  return [["BlogPost",Blog._showing.get()]];
};

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
