const assert = require('assert');
const User = require('../src/models/User');

describe('Sub Documents', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }],
    });
    joe
      .save()
      .then(() => {
        return User.findOne({ name: 'Joe' });
      })
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      })
      .catch((error) => console.error('error: ', error.message));
  });

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [],
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      })
      .catch((error) => {
        console.error('error: ', error.message);
      });
  });

  it('can remove a subdocument of an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Delete Me' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      })
      .catch((error) => {
        console.error('error: ', error.message);
      });
  });
});
