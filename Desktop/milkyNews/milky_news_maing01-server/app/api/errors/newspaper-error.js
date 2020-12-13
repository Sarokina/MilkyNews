"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const NEWSPAPER_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}newspaper/`;

const Update = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}update/`,
  
};

module.exports = {
  Update
};
