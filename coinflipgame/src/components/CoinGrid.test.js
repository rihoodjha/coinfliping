import { render, screen } from "@testing-library/react";
import CoinGrid from "./CoinGrid";

test("renders empty coin image", () => {
  render(<CoinGrid moved={"empty.jpg"} />);
  const coinimage = screen.getAllByTestId("flipcoinimage");
  expect(coinimage[0]).toHaveAttribute("src", "empty.jpg");
});
test("renders heads coin image", () => {
  render(<CoinGrid moved={"heads.jpg"} />);
  const coinimage = screen.getAllByTestId("flipcoinimage");
  expect(coinimage[0]).toHaveAttribute("src", "heads.jpg");
});
