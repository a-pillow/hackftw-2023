//@ts-nocheck
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import Data from "../utils/data.js";
export function InteractiveMap({ tooltip, setTooltip }) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const data = Data.find((el) => el.name === tooltip);
    setData(data);
  }, [tooltip]);

  return (
    <div className="w-full">
      <ComposableMap projectionConfig={{ scale: 180, center: [15, -20] }}>
        <Geographies geography="/countries.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                data-tooltip-id="tooltip"
                data-tooltip-content={data ? data.name : ""}
                style={{
                  default: {
                    fill: "#000",
                    outline: "#f97316",
                  },
                  hover: {
                    fill: "#f97316",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#ea580c",
                    outline: "none",
                  },
                }}
                onMouseEnter={() => setTooltip(geo.properties.name)}
                onClick={() => setTooltip(geo.properties.name)}
                key={geo.rsmKey}
                geography={geo}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}