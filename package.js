Package.describe({
  name: 'elevatedevdesign:simple-blog',
  summary: 'Simple flexible blog for meteor',
  version: '0.0.12',
  git: 'https://github.com/ElevateDevelopmentAndDesign/meteor-simple-blog'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
 
  api.addFiles([
    'lib/blog.js',
    'lib/post.js',
    'lib/routes.js'
  ]);
  
  api.use([
    'aldeed:collection2@2.3.1',
    'aldeed:simple-schema@1.3.0',
    'aldeed:autoform@4.2.2',
    'iron:router@1.0.0',
    'reactive-var',
    'accounts-base',
    'mrt:moment@2.8.1',
    'alanning:roles@1.2.13',
    'dburles:collection-helpers@1.0.2',
    'matb33:collection-hooks@0.7.9',
    'mongo'
  ]);


  api.use([
    'templating',
    'reactive-var',
    'ui',
    'sacha:spin@0.2.4'
  ], 'client');

  api.addFiles([
    'client/blogIndex.html',
    'client/blogIndex.js',
    'client/show.html',
    'client/show.js',
    'client/client.html',
    'client/client.js',
  ],'client');
 

  api.addFiles([
    'server/posts.js',
  ],'server');

  api.export("Blog");
  api.export("Posts");
});

Package.on_test(function (api) {
  api.use(['elevatedevdesign:simple-blog','tinytest', 'test-helpers','aldeed:simple-schema'], ['client', 'server']);
  api.add_files('tests/client.js', ['client']);
});
