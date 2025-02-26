import { useSelector } from "react-redux";
import { selectTimer } from "../context/TimerSlice";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

export default function RenderGameTimer(props) {
  const timers = useSelector(selectTimer);
  const playertimers = timers.filter((x) => x.firstvalue === 1);

  return (
    <Table>
      <TableBody>
        <TableRow name={"shiptimeplayer1click1"} key={1}>
          <TableCell
            key={"1a"}
            sx={{
              fontWeight: "bold",
            }}
          >
            First Value:
          </TableCell>
          {playertimers.map(({ player, id, timer, name }, key) => (
            <TableCell key={key}>{timer}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
