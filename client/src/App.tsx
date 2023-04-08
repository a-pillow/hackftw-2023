import { useEffect, useState } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
//@ts-ignore
import Data from "./utils/data";

function App() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const data = Data.find((el: { name: string }) => el.name === country);
    setData(data);
  }, [country]);

  return (
    <div className="h-screen overflow-auto bg-orange-200">
      <Navbar />
      <InteractiveMap
        data-tooltip-id="tooltip"
        data-tooltip-content="HELLO"
        tooltip={country}
        setTooltip={setCountry}
        data={data}
      />
      <Tooltip
        className="font-bold opacity-100 bg-orange-500 text-white text-lg rounded-sm py-1 px-2"
        id="tooltip"
      />
      <main>
        <div className="flex items-end w-full px-16 ">
          <h1 className="text-6xl font-bold">{data ? data.name : ""}</h1>
          <p className="text-xl">{data ? data.code : ""}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
