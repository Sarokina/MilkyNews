"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
const { DbConnection } = require("uu_appg01_datastore");

class ArticleMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async getCountByTopicId(awid, topicId) {
    return await super.count({
      awid,
      topicList: ObjectId.isValid(topicId) ? new ObjectId(topicId) : topicId
    });
  }

  async removeTopic(awid, topicId) {
    let db = await DbConnection.get(this.customUri);
    await db
      .collection(this.collectionName)
      .updateMany(
        { awid },
        { $pull: { topicList: ObjectId.isValid(topicId) ? new ObjectId(topicId) : topicId } }
      );
  }


  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }


  async list(awid, newspaperId) {
    let filter = { awid };
    newspaperId && (filter.newspaperId = newspaperId);
    return await super.find(filter);
  }

}

module.exports = ArticleMongo;
