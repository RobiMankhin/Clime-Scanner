import { useState } from "react";

import "./App.css";
import { ValueProvider } from "./Storage/ContextApi";
import Home from "./Components/Home";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <ValueProvider>
      <Home />
    </ValueProvider>
  );
}

export default App;
