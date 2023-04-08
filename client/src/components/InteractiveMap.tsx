//@ts-nocheck
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import Data from "../utils/data.js";
export function InteractiveMap({ data, tooltip, setTooltip }) {
  return (
    <div className="w-full">
      <ComposableMap projectionConfig={{ scale: 180, center: [15, -15] }}>
        <Geographies geography="/countries.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <a href="#countryInfo">
                <Geography
                  data-tooltip-id="tooltip"
                  data-tooltip-content={geo.properties.name}
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
                  className="cursor-pointer"
                  onClick={() => {
                    setTooltip(geo.properties.name);
                  }}
                  key={geo.rsmKey}
                  geography={geo}
                />
              </a>
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
