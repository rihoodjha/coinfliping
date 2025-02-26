import React from "react";
import RenderPlayersTimes from "./RenderPlayersTimes";
import RenderFirstValueTimer from "./RenderFirstValueTimer";
import TableContainer from "@mui/material/TableContainer";
import RenderGameTimer from "./RenderGameTimer";

export default function RenderTimers(props) {
  return (
    <div>
      <div>
        <TableContainer>
          <RenderGameTimer socket={props.socket} />
          <RenderPlayersTimes socket={props.socket} />
          <RenderFirstValueTimer socket={props.socket} />
        </TableContainer>
      </div>
    </div>
  );
}
