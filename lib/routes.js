Meteor.startup(function(){
  Router.map(function() {
    this.route('blog', Blog.indexRouteOptions);
    this.route('newBlogPost', Blog.newRouteOptions);
    this.route('editBlogPost', Blog.editRouteOptions);
    this.route('showBlogPost', Blog.showRouteOptions);
  });
});
