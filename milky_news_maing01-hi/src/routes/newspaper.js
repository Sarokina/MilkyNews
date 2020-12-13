//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import ArticleList from "../bricks/article-list";
import ArticleProvider from "../bricks/article-provider";
import NewspaperDetail from "../bricks/newspaper-detail";
//@@viewOff:imports

const Newspaper = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Newspaper",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    newspaperId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    newspaperId: null
  },
  //@@viewOff:defaultProps

  render({ newspaperId }) {

    //@@viewOn:render
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderError(articles, errorState) {
      switch (errorState) {
        case "create":
        case "update":
        case "delete":
          return renderReady(articles);
        case "load":
        default:
          return <UU5.Bricks.Error content="Error happened!" />;
      }
    }

    function renderReady(articles) {
      return (
        <>
          <ArticleList
            articles={articles}
          />
        </>
      );
    }
    return (
      <UU5.Bricks.Container>
        <NewspaperDetail newspaperId={newspaperId} />
        <ArticleProvider
          newspaperId={newspaperId} >
          {({ viewState, asyncData, errorState }) => {

            switch (viewState) {
              case "load":
                return renderLoad();
              case "error":
                return renderError(asyncData, errorState);
              default:
                return renderReady(asyncData);
            }
          }}
        </ArticleProvider>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  }
});

export default Newspaper;
