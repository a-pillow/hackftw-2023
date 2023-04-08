//@ts-nocheck
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export function InteractiveMap({ setTooltip }) {
  return (
    <ComposableMap>
      <Geographies geography="/countries.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
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
                  fill: "#fdba74",
                  outline: "none",
                },
              }}
              onClick={() => setTooltip(geo.properties.name)}
              key={geo.rsmKey}
              geography={geo}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
