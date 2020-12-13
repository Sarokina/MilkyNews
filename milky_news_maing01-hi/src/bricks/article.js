//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Css from "./article.css.js";
//@@viewOff:imports

const Article = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Article",
  //@@viewOff:statics
  //@@viewOn:propTypes
  propTypes: {
    article: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      abstract: UU5.PropTypes.string.isRequired,
      publicationDate: UU5.PropTypes.string.isRequired,
      link: UU5.PropTypes.string.isRequired,
      newspaperId: UU5.PropTypes.number.isRequired,
      topicIdList: UU5.PropTypes.array.isRequired,
      authorId: UU5.PropTypes.number
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    // onDetail: UU5.Bricks.func,
    onUpdate: UU5.PropTypes.func,
    // onUpdate: UU5.Bricks.func,
    onDelete: UU5.PropTypes.func,
    // onDelete: UU5.Bricks.func,
    // onLink: UU5.Bricks.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    article: null,
    colorSchema: "blue",
    onDetail: () => { },
    onUpdate: () => { },
    onDelete: () => { },
    // onLink:() =>{}
  },
  //@@viewOff:defaultProps

  render({ article, colorSchema, onDetail, onUpdate, onDelete }) {
    //@@viewOn:private
    function handleDetail() {
      onDetail(article);
    }

    function handleUpdate() {
      onUpdate(article);
    }

    function handleDelete() {
      onDelete(article);
    }
    //@@viewOff:private

    //@@viewOn:render

    return article ?(
      <UU5.Bricks.Card className={Css.main} colorSchema={colorSchema}>
        <UU5.Bricks.Link href={article.link} target="_blank" className={Css.header} >{article.name} </UU5.Bricks.Link>
        <div className={Css.content}>
          {article.abstract}
        </div>
        <div className={Css.footer}>
          <div> <UU5.Bricks.Icon icon="mdi-calendar" />
            <UU5.Bricks.DateTime value={new Date(article.publicationDate)} format="dd-mm-Y" /></div>
          <div>
            <UU5.Bricks.Button onClick={handleDelete} bgStyle="transparent">
              <UU5.Bricks.Icon icon="mdi-update" />
              <UU5.Bricks.Icon icon="mdi-delete" />
            </UU5.Bricks.Button>
          </div>
        </div>
      </UU5.Bricks.Card>
    ): null;
    //@@viewOff:render
    //@@viewOff:render
  }
});

export default Article;
