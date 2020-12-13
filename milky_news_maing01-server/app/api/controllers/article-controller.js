"use strict";
const ArticleAbl = require("../../abl/article-abl.js");

class ArticleController {
  get(ucEnv) {
    return ArticleAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ArticleAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ArticleAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new ArticleController();
