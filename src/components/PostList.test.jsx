import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import PostList from "./PostList";

it("renders with empty list", () => {
  const { getByText } = render(<PostList postsList={null} />);
  expect(getByText(/No posts loaded/)).toBeInTheDocument();
});
