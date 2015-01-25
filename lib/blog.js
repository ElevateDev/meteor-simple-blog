BlogImpl = function(){
  return {
    _editing: new ReactiveVar( undefined ),
    _showing: new ReactiveVar( undefined ),
    adminRole: "blog_admin",
    indexRouteOptions: {
      template: 'blogIndex',
      path: '/blog'
    },
    editRouteOptions: {
      template: 'blogPostForm',
      path: '/blog/edit/:id',
      onBeforeAction: function(){
        Blog._editing.set(this.params.id);
        this.next();
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
      }
    }
  };
};

Blog = new BlogImpl();
