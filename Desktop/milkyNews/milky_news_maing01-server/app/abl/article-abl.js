"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { SysProfileModel } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/article-error.js");


const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
пше
};

class ArticleAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("article");
  }

  async init(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemas = ["newsMain"];
    let schemaCreateResults = schemas.map(async schema => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    // HDS 3
    try {
      await SysProfileModel.setProfile(awid, { code: "Authorities", roleUri: dtoIn.authoritiesUri });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A4
        throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.authoritiesUri }, e);
      }
      throw e;
    }

    // HDS 4 - HDS N
    // TODO Implement according to application needs...

    // HDS N+1
    return {
      uuAppErrorMap: uuAppErrorMap
    };
  }

  create (awid, dtoIn){
    let validationResult = this.validator.validate("articleCreateInitDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut= {...dtoIn};
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ArticleAbl();
