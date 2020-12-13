// @@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Article from "./article";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const ArticleList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    articles: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    articles: [],
    onDetail: () => { },
    onUpdate: () => { },
    onDelete: () => { }
  },
  //@@viewOff:defaultProps

  render({ articles, onDetail, onUpdate, onDelete, newspaperId }) {
    //@@viewOn:render
    function renderItem(item) {
      return <Article article={item.data} colorSchema="" onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />;
    }
    if (articles.length === 0) {
      return <UU5.Common.Error content="No articles!" />;
    }
    return (
      <Uu5Tiles.Grid
        data={articles}
        tileHeight="auto"
        tileMinWidth={200}
        tileMaxWidth={400}
        tileSpacing={8}
        rowSpacing={8}

      >
        {renderItem}
      </Uu5Tiles.Grid>
    );
    //@@viewOff:render
  }
});

export default ArticleList;