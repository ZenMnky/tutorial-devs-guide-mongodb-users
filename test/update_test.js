const assert = require('assert');
const User = require('../src/models/User');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => {
      done();
    });
  });

  const assertName = (operation, done) => {
    operation
      .then(() => {
        return User.find({});
      })
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Clifford');
        done();
      });
  };

  it('model instance set and save', (done) => {
    joe.set('name', 'Clifford');
    assertName(joe.save(), done);
  });

  it('model instance can update with updateOne', (done) => {
    assertName(joe.updateOne({ name: 'Clifford' }), done);
  });
});
