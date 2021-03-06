"use strict";
const NewspaperAbl = require("../../abl/newspaper-abl.js");

class NewspaperController {

  update(ucEnv) {
    return NewspaperAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new NewspaperController();
