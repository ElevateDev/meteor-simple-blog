BlogImpl = function(){
  return {
    _editing: new ReactiveVar( undefined ),
    _showing: new ReactiveVar( undefined ),
    showAfterTitle: [],
    showAfterBody: [],
    adminRole: "blog_admin",
    indexRouteOptions: {
      template: 'blogIndex',
      path: '/blog',
      waitOn: function(){
        return Meteor.subscribe("BlogPosts");
      }
    },
    editRouteOptions: {
      template: 'blogPostForm',
      path: '/blog/edit/:id',
      onBeforeAction: function(){
        Blog._editing.set(this.params.id);
        this.next();
      },
      waitOn: function(){
        return Meteor.subscribe("BlogPost",this.params.id);
      }
    },
    newRouteOptions: {
      template: 'blogPostForm',
      path: '/blog/new',
      onBeforeAction: function(){
        Blog._editing.set(undefined);
        this.next();
      }
    },
    showRouteOptions: {
      template: 'blogPost',
      path: '/blog/:id',
      onBeforeAction: function(){
        Blog._showing.set(this.params.id);
        this.next();
      },
      waitOn: function(){
        return Meteor.subscribe("BlogPost",this.params.id);
      }
    }
  };
};

Blog = new BlogImpl();
