import React from "react";
import { render, fireEvent } from "app/test-utils";

import AppLayout from "./AppLayout";

// mock posts data
const id = "h0enoh";
const title = "He tried to put it back";

test("renders mock data", () => {
  const { getByText } = render(<AppLayout />);
  expect(getByText(title)).toBeInTheDocument();
});

// move to PostListItem
describe("store mutations", () => {
  test("clicking a post selects it", async () => {
    const { getByTestId } = render(<AppLayout />);
    const postListItemComponent = getByTestId(`PostListItem-${id}`);
    const item = getByTestId("PostPanelItem");
    // initially must show empty text
    expect(item).toContainHTML("Select a post");
    fireEvent.click(postListItemComponent);
    expect(item).toContainHTML(title);
  });

  // TODO... implement more tests
});
