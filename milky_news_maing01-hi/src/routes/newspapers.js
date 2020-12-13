//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import NewspaperProvider from "../bricks/newspaper-provider";
import Newspaper from "./newspaper";
import Uu5Tiles from "uu5tilesg02";
import "../bricks/newspaper.css";
//@@viewOff:imports
const Newspapers = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Newspapers",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
    //@viewOff:hooks

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content,
          colorSchema: "red"
        });
    }
    function goToNewspaper(id) {
      UU5.Environment.getRouter().setRoute({ component: <Newspaper newspaperId={id} />, url: { useCase: "newspaper", parameters: { newspaperId: id } } });
    }
    //@@viewOff:private
    //@@viewOn:render
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }
    function renderItem(item) {
    
      return (
        <UU5.Bricks.Card>
          <UU5.Bricks.Div>
            {item.data.name}
          </UU5.Bricks.Div>
          <UU5.Bricks.Button content="View" onClick={() => goToNewspaper(item.data.id)} />
        </UU5.Bricks.Card>
      );
    }

    function renderReady(newspapers) {
      return (
        <Uu5Tiles.Grid
          data={newspapers}
          tileHeight="auto"
          tileMinWidth={200}
          tileMaxWidth={400}
          tileSpacing={8}
          rowSpacing={8}
        >
          {renderItem}
        </Uu5Tiles.Grid>);

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
    return (
      <UU5.Bricks.Container>
        <NewspaperProvider>
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
        </NewspaperProvider>
      </UU5.Bricks.Container>
    );

    //@@viewOff:render
  }
});

export default Newspapers;
