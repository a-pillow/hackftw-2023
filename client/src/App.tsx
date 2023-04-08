import { useState } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const [country, setCountry] = useState("");
  return (
    <div className="h-screen overflow-auto bg-orange-200">
      <Navbar />
      <InteractiveMap
        data-tooltip-id="tooltip"
        data-tooltip-content="HELLO"
        tooltip={country}
        setTooltip={setCountry}
      />
      <Tooltip
        className="w-96 h-64 opacity-100 bg-orange-500 text-white text-2xl rounded-sm p-1"
        id="tooltip"
      />
      <a>{country}</a>
    </div>
  );
}

export default App;
