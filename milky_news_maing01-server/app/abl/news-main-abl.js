
"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { SysProfileModel: SysProfileAbl, SysAppClientTokenModel: SysAppClientTokenAbl } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { AppClient } = require("uu_appg01_server");
const Path = require("path");
const Errors = require("../api/errors/news-main-error");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`
  }
}

const logger = LoggerFactory.get("UuNewsMain.Models.NewsMainModel");
const AUTHORITIES_PROFILE = "Authorities";
const STATE_ACTIVE = "active";
const STATE_UNDER_CONSTRUCTION = "underConstruction";
const STATE_CLOSED = "closed";

class NewsMainAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "news-main-types.js"));
    this.dao = DaoFactory.getDao("newsMain");
    // redeclare some constants, so they can be used from other abls
    this.STATE_ACTIVE = STATE_ACTIVE;
    this.STATE_UNDER_CONSTRUCTION = STATE_UNDER_CONSTRUCTION;
    this.AUTHORITIES_PROFILE = "Authorities";
  }



  async init(uri, dtoIn) {
    const awid = uri.getAwid();
    // hds 1
    let newsMain = await this.dao.getByAwid(awid);
    // hds 2
    let validationResult = this.validator.validate("newsMainInitDtoInType", dtoIn);
    // A2, A3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );
    dtoIn.state = dtoIn.state || STATE_UNDER_CONSTRUCTION;
    dtoIn.name = dtoIn.name;
    dtoIn.awid = awid;

    // hds 3
    await Promise.all([
      this.dao.createSchema(),
      DaoFactory.getDao("article").createSchema(),
      DaoFactory.getDao("topic").createSchema(),
      DaoFactory.getDao("newspaper").createSchema(),
      DaoFactory.getDao("author").createSchema(),
    ]);
    // hds 4
    try {
      newsMain = await this.dao.create(dtoIn);
    } catch (e) {
    }
    // hds 7
    if (dtoIn.authoritiesUri) {
      try {
        await SysProfileAbl.setProfile(awid, { code: AUTHORITIES_PROFILE, roleUri: dtoIn.authoritiesUri });
      } catch (e) {
        // A7
        throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.authoritiesUri }, e);
      }
    }
    // hds 8
    newsMain.uuAppErrorMap = uuAppErrorMap;
    return newsMain;
  }



  async load(awid, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    let newsMain = await this.checkInstance(
      awid
    );
    // A3
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      newsMain.state === STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(AUTHORITIES)
    )
      // hds 3
      newsMain.authorizedProfileList = authorizedProfiles;
    // HDS 4
    return newsMain;
  }



  async getProductInfo(awid) {
    // hds 1
    let newsMain = await this.dao.getByAwid(awid);
    // hds 2
    return {
      name: newsMain ? newsMain.name : DEFAULTS.name,
      uuAppErrorMap: {}
    };
  }


  //  * Checks whether jokes instance exists and that it is not in closed state.
  //  * @param {String} awid Used awid
  //  * @param {Error} notExistError Error thrown when jokes instance does not exist
  //  * @param {Error} closedStateError Error thrown when jokes instance is in closed state
  //  * @returns {Promise<{}>} jokes instance
  //  */
  async checkInstance(awid, /*closedStateError*/) {
    let newsMain = await this.dao.getByAwid(awid);

    return newsMain;
  }
}

module.exports = new NewsMainAbl();
