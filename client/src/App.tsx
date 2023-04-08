import { useState } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const [country, setCountry] = useState("");
  return (
    <div className="h-screen bg-orange-200">
      <Navbar />
      <InteractiveMap
        data-tooltip-id="tooltip"
        data-tooltip-content="HELLO"
        setTooltip={setCountry}
      />
      <Tooltip id="tooltip" />
      <a>{country}</a>
    </div>
  );
}

export default App;
