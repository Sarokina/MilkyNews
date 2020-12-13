
//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
//@@viewOff:imports

const ArticleCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => { },
    onCancel: () => { }
  },
  //@@viewOff:defaultProps


  render({ onSave, onCancel }) {
    //@@viewOn:render
    return (
      <UU5.Forms.Form onSave={onSave} onCancel={onCancel}>
        <UU5.Forms.Text label="Name" name="name" required="true" />
        <UU5.Forms.Text label="Abstract" name="abstract" required="true" />
        <UU5.Forms.DatePicker format="Y-mm-dd" label="Publication Date" valueType="date" name="publicationDate" required="true" />
        <UU5.Forms.Number label="AuthorId" valueType="mongoId" name="authorId" required="true" />
        <UU5.Forms.Number label="NewspaperId" valueType="mongoId" name="newspaperId" />
        <UU5.Forms.Text label="Link" name="link" required="true" />
        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  }
});


export default ArticleCreateForm;