
"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");
const NewsMainAbl = require("./news-main-abl");
const AUTHORITIES_PROFILE = "Authorities";

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  }
};


class TopicAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "topic-types.js"));
    this.dao = DaoFactory.getDao("topic");
    this.articleDao = DaoFactory.getDao("article");
  }



  async create(awid, dtoIn) {
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Create.MainNewsDoesNotExist,
      Errors.Create.NewsMainNotInProperState
    );


    let validationResult = this.validator.validate("topicCreateInitDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let topic;
    try {
      topic = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 6
    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }



  async delete(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Delete.NewsMainDoesNotExist,
      Errors.Delete.NewsMainNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("topicDeleteInitDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    if (!dtoIn.forceDelete) {
      //  hds 3.1
      let count;
      try {
        count = await this.articleDao.getCountByTopicId(awid, dtoIn.id);
      } catch (e) {
        //  A5
        if (e instanceof ObjectStoreError) {
          throw new Errors.Delete.ArticleDaoGetCountByTopicFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      if (count !== 0) {
        // A6
        throw new Errors.Delete.RelatedArticlesExist({ uuAppErrorMap }, { relatedArticles: count });
      }
    } else {
      // hds 3.2
      try {
        dtoIn.awid = awid;
        await this.articleDao.removeTopic(awid, dtoIn.id);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          // A7
          throw new Errors.Delete.ArticleDaoRemoveTopicFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }
    // hds 4
    await this.dao.delete(awid, dtoIn.id);
    // hds 5
    return { uuAppErrorMap };
  }
}

module.exports = new TopicAbl();
