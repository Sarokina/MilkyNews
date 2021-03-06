//@@viewOn:imports
import { createComponent, usePagingListData } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:imports

const ArticleProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleProvider",
  //@@viewOff:statics
  //@@viewOn:propTypes
  propTypes: {
    newspaperId: UU5.PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    newspaperId: null,
  },
  //@@viewOff:defaultProps
  render({ newspaperId, children }) {
    
    //@@viewOn:hooks
    let listDataValues = usePagingListData({
      dtoIn: { newspaperId, pageInfo:  { pageIndex: 0, pageSize: 200 } },
      onLoad: Calls.listArticles,
      onCreate: Calls.createArticle,
      onUpdate,
      onDelete,
  
    });
    let {
      viewState,
      error,
      errorState,
      syncData,
      asyncData,
      handleLoad,
      handleCreate,
      handleUpdate,
      handleDelete,
    } = listDataValues;
    //@@viewOff:hooks

    //@@viewOn:private
    async function onDelete() {
      return await Calls.deleteArticle({ id });
    }
    async function onUpdate(id, values) {
      try {
        return await Calls.updateArticle({ id, ...values });
      } catch {
        return Promise.reject();
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return children({
      viewState,
      syncData,
      asyncData,
      handleLoad,
      handleCreate,
      handleUpdate,
      handleDelete,
      error,
      errorState
    });
    //@@viewOff:render
  }
  
});

export default ArticleProvider;