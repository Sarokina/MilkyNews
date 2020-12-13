"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/author-error.js");
const NewsMainAbl = require("./news-main-abl");
const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  }
};
const DEFAULTS = {
  pageIndex: 0,
  pageSize: 100
};

const AUTHORITIES_PROFILE = "Authorities";
class AuthorAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "author-types.js"));
    this.dao = DaoFactory.getDao("author");
  }



  async list(awid, dtoIn) {
    await NewsMainAbl.checkInstance(
      awid,
      Errors.List.NewsMainDoesNotExist,
      Errors.List.NewsMainNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("authorListInitDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    let dtoOut = await this.dao.list(awid)

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

    let validationResult = this.validator.validate("authorCreateInitDtoInType", dtoIn);
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

    let author;
    try {
      author = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.AuthorDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 6
    author.uuAppErrorMap = uuAppErrorMap;
    return author;
  }



  async get(awid, dtoIn) {//, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Get.NewsMainDoesNotExist,
      Errors.Get.NewsMainNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("authorGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    // hds 3
    let author = await this.dao.get(awid, dtoIn.id);
    if (!author) {
      // A6
      throw new Errors.Get.AuthorDoesNotExist(uuAppErrorMap, { authorId: dtoIn.id });
    }
    // hds 4
    author.uuAppErrorMap = uuAppErrorMap;
    return author;
  }



}
module.exports = new AuthorAbl();
