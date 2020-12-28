import * as React from "react";
import ReactDOM from "react-dom";

import Debounce from "./search";
import Throttle from "./button";

export default function App() {
  return (
    <div>
      <Debounce />
      <Throttle />
    </div>
  );
}

ReactDOM.render(<App />, document.body);
