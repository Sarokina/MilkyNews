/* eslint-disable */

const authorCreateInitDtoInType = shape({
  lastName: uu5String(200).isRequired(),
  firstName: uu5String(200).isRequired()
});

const authorGetDtoInType = shape({
  id: mongoId().isRequired()
});

const authorListInitDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  categoryList: array(id(), 10),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});


