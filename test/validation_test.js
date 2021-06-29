const assert = require('assert');
const User = require('../src/models/User');

describe.only('Validating records', () => {
  it('requires a user name', (done) => {
    let invalidUser = new User({ name: undefined, postCount: 2 });
    const validationResult = invalidUser.validateSync();

    const { message } = validationResult.errors.name;

    assert(message === 'Name is required');

    done();
  });
});
