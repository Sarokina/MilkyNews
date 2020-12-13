"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const NEWSPAPER_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}newspaper/`;

const Update = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}update/`,
  NewsMainDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newsMainDoesNotExist`;
      this.message = "NewsMain does not exist.";
    }
  },
  NewspaperNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDoesNotExist`;
      this.message = "Newspaper does not exist.";
    }
  },
  NewspaperDaoUpdateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper Dao update failed.";
    }
  },
  NewsMainNotInProperState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}NewsMainNotInProperState`;
      this.message = "NewsMain is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "dtoIn is not valid.";
    }
  },
  NewspaperNameNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperNameNotUnique`;
      this.message = "Newspaper name is not unique in awid.";
    }
  },
  NewspaperDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoCreateFailed`;
      this.message = "Create newspaper failed.";
    }
  },
  NewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDoesNotExist`;
      this.message = "Newspaper does not exist.";
    }
  },
  
};


const Create = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}create/`,
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
  NewspaperNameNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperNameNotUnique`;
      this.message = "Newspaper name is not unique in awid.";
    }
  },
  NewspaperDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoCreateFailed`;
      this.message = "Create newspaper failed.";
    }
  }
};


const List = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}list/`,
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
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}get/`,
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
  },
  NewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}articleDoesNotExist`;
      this.message = "Newspaper does not exist.";
    }
  }
};

module.exports = {
  Create,
  Update,
  List,
  Get
};
