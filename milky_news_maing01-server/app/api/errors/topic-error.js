"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}topic/`;

const Delete = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ArticleDaoGetCountByTopicFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}articleDaoGetCountByTopicFailed`;
      this.message = "Get count by article Dao getCountByTopic failed.";
    }
  },
  RelatedArticlesExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}relatedArticlesExist`;
      this.message = "Topics contains articles.";
    }
  },
  ArticleDaoRemoveTopicFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}articleDaoRemoveTopicFailed`;
      this.message = "Removing topic by article Dao removeTopic failed.";
    }
  },
  TopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },
  TopicDaoGetCountByTopicFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDaoGetCountByTopicFailed`;
      this.message = "Get count by topic Dao getCountByTopic failed.";
    }
  },
};

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
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

  TopicDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TopicDaoCreateFailed`;
      this.message = "Create topic failed.";
    }
  }
};

module.exports = {
  Create,
  Delete
};
