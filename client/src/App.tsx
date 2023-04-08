//@ts-nocheck
import { useEffect, useState } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
//@ts-ignore
import Data from "./utils/data";
import axios from "axios";
import { filter, filterByCountry } from "./utils/filter.js";
import { calculate } from "./utils/countryCalcs.js";

function App() {
  const [country, setCountry] = useState("");
  const [name, setName] = useState(undefined);
  const [population, setPopulation] = useState([]);
  const [yearsTillEmpty, setYearsTillEmpty] = useState(0);

  useEffect(() => {
    const data = Data.find((el: { name: string }) => el.name === country);
    setName(data);
    if (data) {
      const array = filterByCountry(data.name);
      console.log(array);
      let sanitized = [];
      for (const item of array) {
        sanitized = [...sanitized, item["Share of global forest area"]];
      }
      setYearsTillEmpty(calculate(0, sanitized));
    }
    axios
      .get(`https://restcountries.com/v3.1/alpha/${data ? data.code : ""}`)
      .then((res) => {
        setPopulation(res.data[0]);
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
      <main className="-translate-y-28 px-16 mb-64 flex justiy-between w-full">
        <div className="">
          <div id="countryInfo" className="flex justify-start items-end">
            <h1 className="text-6xl mr-1 font-bold">{name ? name.name : ""}</h1>
            <p className="text-lg">{name ? name.code : ""}</p>
          </div>
          <p className="my-3">
            {population.population
              ? `Population: ${population.population}`
              : ""}
          </p>
        </div>
        {name && (
          <>
            {yearsTillEmpty === "good work" ? (
              <div className="ml-16 w-full  py-4 px-6 bg-green-200 rounded-xl duration-200">
                Good news! {name ? name.name : ""} is actually{" "}
                <span className="font-bold">growing</span> in forest land.
              </div>
            ) : (
              <div
                className={`ml-16 w-full py-4 px-6 ${
                  yearsTillEmpty < 50
                    ? "bg-red-500"
                    : yearsTillEmpty < 250
                    ? "bg-red-300"
                    : "bg-orange-100"
                } rounded-xl duration-200`}
              >
                There are{" "}
                <span className="font-bold">{yearsTillEmpty} years </span> until{" "}
                {name ? name.name : ""} loses all forest land.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
