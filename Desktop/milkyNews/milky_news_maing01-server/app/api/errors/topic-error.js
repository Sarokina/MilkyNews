"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}topic/`;

const Delete = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}delete/`,
  
};

module.exports = {
  Delete
};
