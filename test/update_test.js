const assert = require('assert');
const User = require('../src/models/User');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
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
      })
      .catch((error) => console.error('error: ', error.message));
  };

  it('model instance set and save', (done) => {
    joe.set('name', 'Clifford');
    assertName(joe.save(), done);
  });

  it('model instance can update with updateOne', (done) => {
    assertName(joe.updateOne({ name: 'Clifford' }), done);
  });

  it('model class can update', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Clifford' }), done);
  });

  it('model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Clifford' }),
      done
    );
  });

  it('model class can find a record with an ID and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Clifford' }), done);
  });

  it('increments User class likes by 10', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => {
        return User.find({ name: 'Joe' });
      })
      .then((users) => {
        assert(users[0].likes === 10);
        done();
      });
  });
});
