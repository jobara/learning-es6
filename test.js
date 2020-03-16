/*global test:readonly expect:readonly*/

import learn from "./index.js";

test("learn module imported", () => {
  expect(learn).toBeTruthy();
  expect(typeof(learn.scope)).toEqual("function");
});

/*
  For constants only the "variable" itself is immutable. The assigned content can change.
  This means for primitives, the constant cannot be modified, but for an object or array,
  the values can be changed. However, you wouldn't be able to re-assign a new array to the
  same named constant.
 */
test("Constants", () => {
  const VALUE = "test";
  const OBJ = {};
  const ARRY = [];

  expect(VALUE).toEqual("test");
  expect(OBJ).toEqual({});
  expect(ARRY).toEqual([]);
  // eslint-disable-next-line no-const-assign
  expect(() => {VALUE = "change";}).toThrow("Assignment to constant variable.");

  // modify const object
  OBJ.test = "test";
  expect(OBJ).toEqual({test: "test"});
  // eslint-disable-next-line no-const-assign
  expect(() => {OBJ = {new: "New"};}).toThrow("Assignment to constant variable.");

  // modify array member
  ARRY.push("test");
  expect(ARRY).toEqual(["test"]);
  // eslint-disable-next-line no-const-assign
  expect(() => {ARRY = ["NEW"];}).toThrow("Assignment to constant variable.");
});
