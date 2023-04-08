//@ts-nocheck
import { useEffect, useState } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
//@ts-ignore
import Data from "./utils/data";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("");
  const [name, setName] = useState(undefined);
  const [population, setPopulation] = useState([]);

  useEffect(() => {
    const data = Data.find((el: { name: string }) => el.name === country);
    setName(data);
    axios
      .get(`https://restcountries.com/v3.1/alpha/${data ? data.code : ""}`)
      .then((res) => {
        setPopulation(res.data[0]);
        console.log(population);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [country]);

  return (
    <div className="h-screen scroll-smooth overflow-auto bg-orange-200">
      <Navbar />
      <InteractiveMap
        data-tooltip-id="tooltip"
        data-tooltip-content="HELLO"
        tooltip={country}
        setTooltip={setCountry}
      />
      <Tooltip
        className="font-bold opacity-80 bg-orange-500 text-white text-lg rounded-sm py-1 px-2"
        id="tooltip"
      />
      <main className="px-16 mb-64 w-full">
        <div id="countryInfo" className="flex items-end w-full ">
          <h1 className="text-6xl mr-2 font-bold">{name ? name.name : ""}</h1>
          <p className="text-xl">{name ? name.code : ""}</p>
        </div>
        <p className="mt-5">
          {population.population ? `Population: ${population.population}` : ""}
        </p>
      </main>
    </div>
  );
}

export default App;
