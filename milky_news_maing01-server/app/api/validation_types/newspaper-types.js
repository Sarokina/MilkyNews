/* eslint-disable */
const newspaperUpdateInitDtoInType = shape({
    name: uu5String(200).isRequired(),
    id: mongoId().isRequired()
});
const newspaperCreateInitDtoInType = shape({
    name: uu5String(200).isRequired(),
    description:uu5String(500)
});

const newspaperGetDtoInType = shape({
    id: mongoId().isRequired()
});

const newspaperListDtoInType = shape({
    pageInfo: shape({
        pageIndex: integer(),
        pageSize: integer()
    })
});