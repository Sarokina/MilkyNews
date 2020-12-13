"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/article-error.js");
const NewsMainAbl = require("./news-main-abl");
const { Base64 } = require("uu_appg01_server").Utils;
const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};
const AUTHORITIES_PROFILE = "Authorities";

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  newspaperId: "5eef1fabc8221c23984c3f92",
  pageIndex: 0,
  pageSize: 100
};

class ArticleAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "article-types.js"));
    this.dao = DaoFactory.getDao("article");

  }

  async list(awid, dtoIn) {
    await NewsMainAbl.checkInstance(
      awid,
      Errors.List.NewsMainDoesNotExist,
      Errors.List.NewsMainNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("articleListInitDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    let dtoOut = await this.dao.list(awid, dtoIn.newspaperId)//, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);  

    // hds 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn, session, authorizationResult) {
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Create.NewsMainDoesNotExist,
      Errors.Create.NewsMainNotInProperState
    );


    let validationResult = this.validator.validate("articleCreateInitDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);

    // hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.awid = awid;

    let article;
    try {
      article = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.ArticleDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 6
    article.uuAppErrorMap = uuAppErrorMap;
    return article;
  }

  // hds 3

  async get(awid, dtoIn) {//, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Get.NewsMainDoesNotExist,
      Errors.Get.NewsMainNotInProperState
    );
    // A3
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      NewsMain.state === NewsMainAbl.STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(NewsMainAbl.AUTHORITIES_PROFILE)
    ) {
      throw new Errors.Get.NewsMainIsUnderConstruction({}, { state: newsMain.state });
    }

    // hds 2, 2.1
    let validationResult = this.validator.validate("articleGetInitDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds 3
    let article = await this.dao.get(awid, dtoIn.id);
    if (!article) {
      // A6
      throw new Errors.Get.ArticleDoesNotExist(uuAppErrorMap, { articleId: dtoIn.id });
    }

    // hds 4
    article.uuAppErrorMap = uuAppErrorMap;
    return article;
  }

}

module.exports = new ArticleAbl();
