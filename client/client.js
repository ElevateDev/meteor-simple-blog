Template.blogPostForm.helpers({
  editDoc: function(){
    return Posts.findOne(Blog._editing.get());
  },
  formMode: function(){
    return !!Blog._editing.get() ? "update" : "insert";
  }
});

AutoForm.addHooks(['blogPostForm'], {
  after: {
    insert: function(error, result) {
      if (error) {
        console.log("Insert Error:", error);
      } else {
        console.log("Insert Result:", result);
        Router.go('editBlogPost', {'id': result});
      }
    },
    update: function(error) {
      if (error) {
        console.log("Update Error:", error);
      } else {
        console.log("Updated!");
      }
    }
  }
});

UI.registerHelper('blogAdmin', function(){
  return Roles.userIsInRole(Meteor.userId(), Blog.adminRole, Roles.GLOBAL_GROUP);
});
