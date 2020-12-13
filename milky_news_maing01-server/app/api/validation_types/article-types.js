/* eslint-disable */

const articleCreateInitDtoInType = shape({
    name: uu5String(200).isRequired(),
    abstract: uu5String(200).isRequired(),
    image: binary(),
    publicationDate: datetime().isRequired(),
    authorId:mongoId(),
    link: uri().isRequired(),
    topicIdList: array(id(), 2),
    newspaperId: mongoId().isRequired(),
   });
   const articleDeleteInitDtoInType = shape({
    Id:id().isRequired
   });
 
   const articleListInitDtoInType = shape({
    categoryList: array(id(), 10),
    newspaperId: mongoId(),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });