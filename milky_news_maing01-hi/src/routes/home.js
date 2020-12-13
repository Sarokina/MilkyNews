//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home"
  //@@viewOff:statics
};

export const Home = createVisualComponent({
  ...STATICS,

  // @@viewOn:propTypes
  // @@viewOff:propTypes

  // @@viewOn:defaultProps
  // @@viewOff:defaultProps

  // @@viewOn:render
  render() {
    return (

        <div class="hello" >
          <h1 >Welcome to the Milky News</h1>
          <p>Here you can find various news about milk industry in all the world.</p>
        </div>
    );
  }

});

export default Home;