import { useState } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";

function App() {
  const [country, setCountry] = useState("");
  return (
    <div className="h-screen bg-orange-200">
      <Navbar />
      <InteractiveMap setTooltip={setCountry} />
      <Tooltip id="tooltip">{country}</Tooltip>
      <h1 data-tooltip-id="tooltip" data-tooltip-content={country}>
        {country}
      </h1>
    </div>
  );
}

export default App;
