
"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewspaperMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }

  async update(uuObject) {
    console.log(uuObject);

    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = NewspaperMongo;
