import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("Counter renders correctly", () => {
  render(<Counter />);
  expect(screen.getByText(/Counter:/)).toBeInTheDocument();
});

test("Increase button countiig 1 eer ihesgedeg", () => {
  render(<Counter />);
  const button = screen.getByText("Increase");
  fireEvent.click(button);
  const divElement = screen.getByText("Counter: 1");
  expect(divElement.tagName.toLowerCase()).toBe("h1");
});

test("Decrease button countiig 1 eer bagasgadag", () => {
  render(<Counter />);
  const decreaseButton = screen.getByText("Decrease");
  fireEvent.click(decreaseButton);
  const divElement = screen.getByText("Counter: -1");
  expect(divElement.tagName.toLowerCase()).toBe("h1");

});
