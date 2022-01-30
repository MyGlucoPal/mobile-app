import React from "react";
import renderer from "react-test-renderer";

import Infobox from "../../src/components/InfoBox";

const TEST_TITLE = "Some title";
const TEST_VALUE = "Some value";

describe("Info box displays correct values", () => {
  it("has 1 child", () => {
    const tree = renderer
      .create(<Infobox title={TEST_TITLE} caption={TEST_VALUE} />)
      .toJSON();
    //@ts-ignore
    expect(tree.children.length).toBe(2);
  });
});
