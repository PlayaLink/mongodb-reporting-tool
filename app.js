const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = require('./keys').mongoUrl;

// Database Name
const dbName = 'iep_goal_tracker';

const findDocuments = function (db, coll, callback) {
  // Get the documents collection
  console.log('inside findDocuments');
  const collection = db.collection(coll);

  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    console.log('inside callback');
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
    return docs;
  });
};

// Use connect method to connect to the server
MongoClient.connect(url).then(function (client) {
  const db = client.db(dbName);

  const students = findDocuments(db, 'students', function () {
    console.log('students fetched');
  });
  const users = findDocuments(db, 'users', function () {
    console.log('users fetched');
  });
  for (var i = 0; i < users.length; i++) {
    users[ i ].students = [];
    for (var j = 0; j < students; j++) {
      if (users[ i ].id === students[ j ].instructorId) {
        users[ i ].students.push(students[ j ]);
      }
    }
  }
  console.log('users: ', users);
}).catch(function(err){
  console.log(err);
})


