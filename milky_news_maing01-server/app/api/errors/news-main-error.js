 "use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error");
const JOKES_INSTANCE_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}newsMain/`;

const Init = {
  UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}init/`,
  NewsMainAlreadyInitialized: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}newsMainAlreadyInitialized`;
      this.message = "NewsMain is already initialized.";
    }
  },
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SysSetProfileFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Create uuAppProfile failed.";
    }
  }
};



module.exports = {
  Init,
  // Load

};
