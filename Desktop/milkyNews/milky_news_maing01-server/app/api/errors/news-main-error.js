"use strict";
const NewsMainUseCaseError = require("./news-main-use-case-error.js");

const Init = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  }
};
 const Create = {
   UC_CODE: `${ NewsMainUseCaseError.ERROR_PREFIX }news/create/`,

   InvalidDtoIn: class extends NewsMainUseCaseError{
     constructor(){
     super (...arguments);
     this.code = `${Create.UC_CODE}InvaliddToIn`;
     this.message = "DtoIn is not valid.";
     }
   }
 };
 const List = {
  UC_CODE: `${ NewsMainUseCaseError.ERROR_PREFIX }article/list/`,

 }

module.exports = {
  Init, 
  Create,
  List
};
