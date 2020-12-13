"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewsMainMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }
  
  async create(newsMain) {
    return await super.insertOne(newsMain);
  }

  async getByAwid(awid) {
    return await super.findOne({ awid });
  }

  async updateByAwid(newsMain) {
    return await super.findOneAndUpdate({ awid: newsMain.awid }, newsMain, "NONE");
  }
}

module.exports = NewsMainMongo;
