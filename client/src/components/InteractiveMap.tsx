//@ts-nocheck
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
export function InteractiveMap({ setTooltip }) {
  return (
    <div className="w-full">
      <ComposableMap projectionConfig={{ scale: 175, center: [15, 0] }}>
        <Geographies geography="/countries.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                data-tooltip-id="tooltip"
                data-tooltip-content="HELLO"
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
