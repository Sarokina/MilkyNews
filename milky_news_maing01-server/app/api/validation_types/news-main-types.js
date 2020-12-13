/* eslint-disable */

const newsCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000)
});
const articleCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000)
});
const newsMainInitDtoInType = shape({
  authoritiesUri: uri().isRequired(),
  state: oneOf(["active", "underConstruction", "closed"]),
  name: uu5String(4000)

});
