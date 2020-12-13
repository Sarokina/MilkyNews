//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useData } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const NespaperDetail = createComponent({
    //@@viewOn:statics
    displayName: Config.TAG + "NewspaperDetail",
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
        //@@viewOn:hooks
        let dataValues = useData({
            dtoIn: { id: newspaperId },
            onLoad: Calls.getNewspaper
        });

        let { viewState, errorState, error, syncData, asyncData } = dataValues;
        //@@viewOff:hooks

        //@@viewOn:render
        function renderLoad() {
            return <UU5.Bricks.Loading />;
        }

        function renderError(errorState, error) {
            return <UU5.Common.Error error={error} content="Error happened!" />;
        }

        function renderReady(newspaper) {
            return (
                <>
                    < UU5.Bricks.Jumbotron>
                        <UU5.Bricks.P style={{ fontSize: "36px", fontWeight:"bold", color: "Black" }}>
                            {newspaper.name}
                        </UU5.Bricks.P>
                        {newspaper.description}
                    </UU5.Bricks.Jumbotron>
                </>
            );
        }
        switch (viewState) {
            case "load":
                return renderLoad();
            case "error":
                return renderError(errorState, error);
            default:
                return renderReady(asyncData);
        }
        //@@viewOff:render
    }
});

export default NespaperDetail;