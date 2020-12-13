"use strict";
const ArticleAbl = require("../../abl/article-abl.js");

class ArticleController {
  init(ucEnv) {
    return ArticleAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv){
    return ArticleAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ArticleController();