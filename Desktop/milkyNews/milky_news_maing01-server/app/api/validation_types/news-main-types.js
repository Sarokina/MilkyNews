/* eslint-disable */

const initDtoInType = shape({
  authoritiesUri: uri().isRequired()
});
const newsCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000)
});
const articleCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000)
});