"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const AUTHOR_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}author/`;


const Create = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}create/`,
  NewsMainDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsMainDoesNotExist`;
      this.message = "NewsMain does not exist.";
    }
  },
  NewsMainNotInProperState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}NewsMainNotInProperState`;
      this.message = "NewsMain is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
 
  AuthorDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}AuthorDaoCreateFailed`;
      this.message = "Create author failed.";
    }
  }
};


const List = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}list/`,
  NewsMainDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}NewsMainDoesNotExist`;
      this.message = "NewsMain does not exist.";
    }
  },
  NewsMainNotInProperState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}newsMainNotInProperState`;
      this.message = "NewsMain is not in proper state [active|underConstruction].";
    }
  },
  NewsMainIsUnderConstruction: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}newsMainIsUnderConstruction`;
      this.message = "newsMain is in state underConstruction.";
    }
  },
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};
const Get = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}get/`,
  NewsMainDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}NewsMainDoesNotExist`;
      this.message = "NewsMain does not exist.";
    }
  },
  NewsMainNotInProperState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsMainNotInProperState`;
      this.message = "NewsMain is not in proper state [active|underConstruction].";
    }
  },
  NewsMainIsUnderConstruction: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsMainIsUnderConstruction`;
      this.message = "newsMain is in state underConstruction.";
    }
  },
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  List,
  Create,
  Get
  
};
