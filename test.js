/*global test:readonly expect:readonly*/

import learn from "./index.js";

test("learn module imported", () => {
  expect(learn).toBeTruthy();
});
