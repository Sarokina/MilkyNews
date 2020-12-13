"use strict";
const TopicAbl = require("../../abl/topic-abl.js");

class TopicController {

  delete(ucEnv) {
    return TopicAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TopicController();
