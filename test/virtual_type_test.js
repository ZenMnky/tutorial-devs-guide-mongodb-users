const assert = require('assert');
const User = require('../src/models/User');

describe('Virtual Types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Only Post' }],
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      })
      .catch((error) => console.error('error: ', error.message));
  });
});
