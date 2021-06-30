require('dotenv').config();
const mongoose = require('mongoose');

before((done) => {
  mongoose.connect(process.env.TEST_DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connected to Test DB');
    done();
  });
});

cleanUp = (done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  /**
   * can not drop multiple collections at once
   * use callback hell
   * or make a loop
   */

  // users.drop(() => {
  //   comments.drop(() => {
  //     blogposts.drop(() => {
  //       done();
  //     });
  //   });
  // });

  [users, comments, blogposts].forEach((collection, index, thisArray) => {
    collection.drop();
    if (index === thisArray.length - 1) {
      done();
    }
  });
};

beforeEach((done) => cleanUp(done));
