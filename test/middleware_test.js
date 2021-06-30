const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/models/User');
const BlogPost = require('../src/models/BlogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Key Insights', content: 'Lorum Ipsum' });

    joe.blogPosts.push(blogPost);

    joe.save().then(() => done());

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up associated blogposts on remove', (done) => {
    joe
      .remove()
      .then(() => BlogPost.countDocuments({}))
      .then((count) => {
        // console.log('count: ', count);
        assert(count === 0);
        done();
      });
  });
});
