"use strict";
const NewsMainAbl = require("../../abl/news-main-abl.js");

class NewsMainController {
  init(ucEnv) {
    return NewsMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  helloWorld(ucEnv) {
    let dtoOut = {
      text: "Hello World!",
      uuAppErrorMap: {}
    };
    return dtoOut;
  }
  create(ucEnv){
    return NewsMainAbl.create(ucEnv.getUrl().getAwid(),ucEnv
    .getDtoIn());
  }
}

module.exports = new NewsMainController();
