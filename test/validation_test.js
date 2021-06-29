const assert = require('assert');
const User = require('../src/models/User');

describe('Validating records', () => {
  it('requires a user name', (done) => {
    const invalidUser = new User({ name: undefined, postCount: 2 });
    const validationResult = invalidUser.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required');
    done();
  });

  it('requires a user name longer than 2 characters', (done) => {
    const invalidUser = new User({ name: 'No' });
    const validationResult = invalidUser.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const invalidUser = new User({ name: undefined, postCount: 2 });
    invalidUser.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name is required');
      done();
    });
  });
});
