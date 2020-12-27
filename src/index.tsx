import * as React from "react";
import ReactDOM from "react-dom";

import Debounce from "./search";

export default function App() {
  return (
    <div>
      <Debounce />
    </div>
  );
}

ReactDOM.render(<App />, document.body);
