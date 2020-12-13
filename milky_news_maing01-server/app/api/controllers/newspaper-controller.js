
"use strict";
const NewspaperAbl = require("../../abl/newspaper-abl.js");

class NewspaperController {

  create(ucEnv) {
    return NewspaperAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());

  }
  get(ucEnv) {
    return NewspaperAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return NewspaperAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return NewspaperAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new NewspaperController();

