const NewsMainAbl = require("../../abl/news-main-abl.js");
const CACHE_VALUE = "public, max-age=86400, s-maxage=86400";

class NewsMainController {
  static init(ucEnv) {
    return NewsMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  static plugInBt(ucEnv) {
    return NewsMainAbl.plugInBt(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  static load(ucEnv) {
    return NewsMainAbl.load(ucEnv.uri.getAwid(), ucEnv.getAuthorizationResult());
  }
  static create(ucEnv) {
    return NewsMainAbl.load(ucEnv.uri.getAwid(), ucEnv.getAuthorizationResult(), ucEnv.getSession());
  }

  static update(ucEnv) {
    return NewsMainAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static getProductInfo(ucEnv) {
    ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
    return NewsMainAbl.getProductInfo(ucEnv.uri.getAwid());
  }

 
}

module.exports = NewsMainController;
