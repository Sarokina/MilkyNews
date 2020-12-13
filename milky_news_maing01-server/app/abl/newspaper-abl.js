"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/newspaper-error.js");
const NewsMainAbl = require("./news-main-abl");
const AUTHORITIES_PROFILE = "Authorities";

const WARNINGS = {
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },

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


class NewspaperAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "newspaper-types.js"));
    this.dao = DaoFactory.getDao("newspaper");
  }



  async create(awid, dtoIn, session, authorizationResult) {
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Create.NewsMainDoesNotExist,
      Errors.Create.NewsMainNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("newspaperCreateInitDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();

    dtoIn.awid = awid;
    let newspaper;
    try {
      newspaper = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.NewspaperDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 4
    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper;
  }



  async get(awid, dtoIn) {//, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Get.NewsMainDoesNotExist,
      Errors.Get.NewsMainNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("newspaperGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    // hds 3
    let newspaper = await this.dao.get(awid, dtoIn.id);
    if (!newspaper) {
      // A6
      throw new Errors.Get.NewspaperDoesNotExist(uuAppErrorMap, { newspaperId: dtoIn.id });
    }
    // hds 4
    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper;
  }



  async update(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await NewsMainAbl.checkInstance(
      awid,
      Errors.Update.NewsMainDoesNotExist,
      Errors.Update.NewsMainNotInProperState
    );
    // hds 2, 2.1
    let validationResult = this.validator.validate("newspaperUpdateInitDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);
    // hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    // dtoIn.awid = awid;
    let newspaper;
    try {
      dtoIn.awid = awid;
      newspaper = await this.dao.update(dtoIn);
      console.log(newspaper)
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.Update.NewspaperDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 4
    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper;
  }



  async list(awid, dtoIn) {
    await NewsMainAbl.checkInstance(
      awid,
      Errors.List.NewsMainDoesNotExist,
      Errors.List.NewsMainNotInProperState
    );
    // hds 2, 2.1
    let validationResult = this.validator.validate("newspaperListDtoInType", dtoIn);
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

}


module.exports = new NewspaperAbl();

