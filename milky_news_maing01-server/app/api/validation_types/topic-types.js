/* eslint-disable */
const topicDeleteInitDtoInType = shape({
    id: mongoId().isRequired()
   });
const topicCreateInitDtoInType = shape({
    name: uu5String().isRequired()
   });

   