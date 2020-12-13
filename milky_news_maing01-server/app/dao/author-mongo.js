"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AuthorMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(awid,  order, pageInfo) {
    // let sort = { name: order === "asc" ? 1 : -1 };
    return await super.find({ awid,});//, pageInfo, sort);
  }
  
}

module.exports = AuthorMongo;
