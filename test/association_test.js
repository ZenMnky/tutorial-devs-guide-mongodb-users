const assert = require('assert');
const User = require('../src/models/User');
const Comment = require('../src/models/Comment');
const BlogPost = require('../src/models/BlogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Key Insights', content: 'Lorum Ipsum' });
    comment = new Comment({ content: 'Sweet post!' });

    // wiring up associations with mongoose magic
    joe.blogPosts.push(blogPost); // has many
    blogPost.comments.push(comment); // has many
    comment.user = joe; // has one

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relations between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Key Insights');
        done();
      });
  });
});
