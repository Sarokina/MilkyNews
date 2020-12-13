const articleCreateInitDtoInType = shape({
    name: uu5String(200).isRequired(),
    abstract: uu5String(500),
    image: binary(),
    newsId: id().isRequired(),
    publicationDate: date(),//.isRequired(),
    authorId:id().isRequired(),
    link: uu5String(200),//.isRequired(),
    topicIdList: array(id(), 10).isRequired()
   });