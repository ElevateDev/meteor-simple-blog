# Purpose

The purpose of this package is not to provide a blog that is the end all be all.  It is intended to be simply configurable, and extensible while providing the barebones boilerplate needed.

# Setup

The admin needs to be added to 'blog_admin' in Roles.GLOBAL_GROUP.

# Additional Packages

Composition is a powerful thing.

## SEO

  meteor add elevatedevdesign:simple-blog-seo

## DISQUS

  meteor add elevatedevdesign:simple-blog-disqus

Then in your code

  Blog.disqusShortname = 'YOUR_SHORTNAME';

# Styling

No styling is included in this app. For a basic style using less try the following

```less
.blog{
  article{
    .make-row();
    position: relative;
    padding: 25px;
  }
  
  h1,
  h2,
  time, 
  .blog-post-author, 
  .blog-post-description,
  .blog-post-body{
    .make-xs-column(12);
  }
  
  button{
    .btn;
    .btn-primary;
  }
  .blog-post-summary{
    &:hover{
      background: @gray-lighter;
    }
  }
  .edit-blog-post-btn{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .blog-post-summary{
    border-bottom: 1px black;
  }
}
```

# Routes

Default route is /blog.  If logged in to a blog admin account you will see buttons to administer.
