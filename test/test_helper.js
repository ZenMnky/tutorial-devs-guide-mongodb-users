require('dotenv').config();
const mongoose = require('mongoose');

before((done) => {
  mongoose.connect(process.env.TEST_DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connected to Test DB');
    done();
  });
});

cleanUp = (done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run the next test
    done();
  });
};

beforeEach((done) => cleanUp(done));
