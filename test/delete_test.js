const assert = require('assert');
const User = require('../src/models/User');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => {
      done();
    });
  });

  it('model instance remove', (done) => {
    joe
      .deleteOne()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(!user);
        done();
      });
  });

  it('class method remove', (done) => {
    // remove a bunch of records with some given criteria
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(!user);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(!user);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove({ _id: joe._id })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(!user);
        done();
      });
  });
});
