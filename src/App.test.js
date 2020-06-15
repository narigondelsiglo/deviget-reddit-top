import React from "react";
import { render } from "./app/test-utils";
import App from "./App";

test("renders app bar", () => {
  const { getByText } = render(<App />);
  expect(getByText(/Reddit Top Posts/)).toBeInTheDocument();
});
