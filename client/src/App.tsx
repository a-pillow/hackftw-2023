//@ts-nocheck
import { useEffect, useState, useMemo } from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { Navbar } from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
//@ts-ignore
import Data from "./utils/data";
import axios from "axios";
import { filter, filterByCountry } from "./utils/filter.js";
import { calculate } from "./utils/countryCalcs.js";
import { Chart } from "react-charts";

function App() {
  const [country, setCountry] = useState("");
  const [name, setName] = useState(undefined);
  const [population, setPopulation] = useState([]);
  const [yearsTillEmpty, setYearsTillEmpty] = useState(0);
  const [chartData, setChartData] = useState([]);

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.Year,
      elementType: "time",
    }),

    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) =>
          Number(datum["Share of global forest area"]).toFixed(3),
        elementType: "line",
        showDatumElements: false,
      },
    ],

    []
  );

  const sanitize = (arr) => {
    let array = [];
    for (const item of arr) {
      const t = item["Share of global forest area"];
      array = [...array, t];
    }
    return array;
  };

  useEffect(() => {
    const countryData = Data.find(
      (el: { name: string }) => el.name === country
    );
    if (countryData) {
      setName(countryData);
      const array = filterByCountry(countryData.name);
      setYearsTillEmpty(calculate(0, sanitize(array)));
      setChartData([
        {
          label: "Coverage",
          data: array,
        },
      ]);
    }
    axios
      .get(
        `https://restcountries.com/v3.1/alpha/${
          countryData ? countryData.code : ""
        }`
      )
      .then((res) => {
        setPopulation(res.data[0]);
      })
      .catch((err) => {
        console.log("axios error");
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
      <main className="-translate-y-28 px-16 mb-4 flex justiy-between w-full">
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
      {name ? (
        <Chart
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
