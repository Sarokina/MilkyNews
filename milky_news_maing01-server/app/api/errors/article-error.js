"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const ARTICLE_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}article/`;

const Create = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}create/`,
  NewsMainDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsMainDoesNotExist`;
      this.message = "NewsMain does not exist.";
    }
  },
  ArticleDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}articleDoesNotExist`;
      this.message = "article does not exist.";
    }
  },
  NewsMainNotInProperState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsMAinNotInProperState`;
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
  ArticleDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}ArticleDaoCreateFailed`;
      this.message = "Create article failed.";
    }
  },
  InvalidPhotoContentType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidPhotoContentType`;
      this.message = "ContentType of new photo is invalid.";
    }
  },
  UuBinaryCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
};
const Get = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}get/`,
  NewsMainDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsMainDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  NewsMainNotInProperState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsMainNotInProperState`;
      this.message = "NewsMainInstance is not in proper state [active|underConstruction].";
    }
  },
  NewsMainIsUnderConstruction: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsMainIsUnderConstruction`;
      this.message = "NewsMain is in underConstruction state.";
    }
  },
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ArticleDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}articleDoesNotExist`;
      this.message = "Joke does not exist.";
    }
  }
};


const List = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}list/`,
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

module.exports = {
  List,
  Create,
  Get
};
