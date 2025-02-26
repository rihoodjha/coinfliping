export default function CoinGrid(props) {
  return (
    <div>
      <div data-testid="coin" justified="center" alignitems="center">
        <button
          className={
            props.tennessee
              ? "background-orange"
              : props.background
              ? "background-red"
              : "background-blue"
          }
          data-testid="flipcoinbutton"
          onClick={props.flipthecoin}
          name={"flipcoinbutton" + props.coin}
        >
          <img
            data-testid="flipcoinimage"
            className={
              props.tennessee
                ? "background-orange"
                : props.background
                ? "background-red"
                : "background-blue"
            }
            name={"flipcoinimage" + props.coin}
            src={props.moved}
            height="75px"
            width="75px"
            alt={props.coin}
            id={"flipcoinimage" + props.coin}
          />
        </button>
      </div>
    </div>
  );
}
