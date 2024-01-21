const mongoose = require('mongoose');
const {
  db: { name, host, port },
} = require('../configs/mongodb.config');
const { countConnect } = require('../helpers/checkConnect');

const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) => {
        console.log(`Connecting to MongoDB on port ${port}`);
        countConnect();
      })
      .catch((err) => console.log('Error Connect!', err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
