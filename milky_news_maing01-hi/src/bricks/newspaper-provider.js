//@@viewOn:imports
import { createComponent, usePagingListData } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:imports

const NewspaperProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "NewspaperProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    let listDataValues = usePagingListData({
      dtoIn: { pageInfo: { pageIndex: 0, pageSize: 200 } },
      onLoad: Calls.listNewspapers,
    });

    let {
      viewState,
      error,
      errorState,
      syncData,
      asyncData,
      handleLoad,
    } = listDataValues;
    //@@viewOff:hooks

    //@@viewOn:render
    return children({
      viewState,
      syncData,
      asyncData,
      handleLoad,
      error,
      errorState
    });
    //@@viewOff:render
  }

});

export default NewspaperProvider;