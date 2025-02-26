import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import { selectGameType } from "../context/GameTypeSlice";
import { useSelector } from "react-redux";
import { SendGameTypeChanged } from "../components/SendEvents";
import { SendResetEvents } from "../components/SendResetEvents";

export function TabsforGameSelector(props) {
  const socket = props.socket;
  const gameTypeSelector = useSelector(selectGameType);

  const handleChange = (event, newValue) => {
    SendGameTypeChanged(socket, newValue);
    SendResetEvents(socket);
  };

  const rendercoins = () => {
    let tabselected = 0;
    if (gameTypeSelector !== undefined && gameTypeSelector.length > 0) {
      const gameselected = gameTypeSelector.filter((x) => x.selected);
      if (gameselected.length > 0) {
        tabselected = gameselected[0].id;
      }
    }

    return (
      <Tabs
        value={tabselected}
        onChange={handleChange}
        aria-label="icon position tabs example"
      >
        <Tab
          name="the20gameselector"
          icon={<LocalShippingTwoToneIcon />}
          label="20 Coins"
          alt="20"
        />
        <Tab
          name="the10gameselector"
          icon={<LocalShippingTwoToneIcon />}
          label="10 Coins"
          alt="10"
        />
        <Tab
          name="the5gameselector"
          icon={<LocalShippingTwoToneIcon />}
          label="5 Coins"
          alt="5"
        />
      </Tabs>
    );
  };

  return <div>{rendercoins()}</div>;
}
