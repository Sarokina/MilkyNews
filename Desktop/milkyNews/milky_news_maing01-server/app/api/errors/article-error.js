"use strict";
const NewsMainUseCaseError = require("./news-main-use-case-error.js");

 const Create = {
   UC_CODE: `${ NewsMainUseCaseError.ERROR_PREFIX }article/create/`,

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

  InvalidDtoIn: class extends NewsMainUseCaseError{
    constructor(){
    super (...arguments);
    this.code = `${List.UC_CODE}InvaliddToIn`;
    this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  Create,
  List
};
