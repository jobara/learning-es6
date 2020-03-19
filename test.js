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

/*
  `var` is function scoped; `let` and `const` are block scoped
 */
test("Scoping", () => {
  var outterVar = 2;
  let outterLet = 2;

  if (outterVar === outterLet) {
    const INNER_CONST = 3;
    var innerVar = INNER_CONST;
    let innerLet = INNER_CONST;

    outterVar += innerVar;
    outterLet += innerLet;
  }

  expect(outterVar).toBe(5);
  expect(outterLet).toBe(5);
  expect(innerVar).toBe(3);
  // eslint-disable-next-line no-undef
  expect(() => innerLet).toThrow(/not defined/);
  // eslint-disable-next-line no-undef
  expect(() => INNER_CONST).toThrow(/not defined/);
});

/*
  Arrow functions:
  - no args requires "()" brackets
  - single arg doesn't require brackets around args
  - multiple args require "()" brackets around args
  - single line statement doesn't require "{}" brackets or explicit return statement
  - multiline statement requires "{}" brackets and explicit return statement
 */
test("Arrow Functions", () => {
  let getValue = () => "value";
  let identity = v => v;
  let sum = (a, b) => a + b;
  let isOdd = a => {
    return a % 2 === 0;
  };

  expect(getValue()).toEqual("value");
  expect(identity(2)).toBe(2);
  expect(sum(1, 2)).toBe(3);
  expect(isOdd(2)).toBe(true);
});

/*
  Default: can specify a default value in the args list
  Rest: aggregates remaining arguments under a single named parameter
  Spread: spreads iterable elements into a literal or parameter
 */
test("Parameters", () => {
  // Defaults
  let makeCar = (make, model, year = 2020) => {
    return {
      make: make,
      model: model,
      year: year
    };
  };

  expect(makeCar("honda", "civic")).toEqual({make: "honda", model: "civic", year: 2020});
  expect(makeCar("toyota", "rav4", 2015)).toEqual({make: "toyota", model: "rav4", year: 2015});

  // rest parameter
  let familyCount = (mom, dad, ...children) => {
    let count = 0;

    if (mom) {count++;}
    if (dad) {count++;}

    count += children.length;

    return count;
  };

  expect(familyCount("Christine", "Tommas")).toBe(2);
  expect(familyCount("Joy", "Terrence", "Philip", "Mindy")).toBe(4);

  // spread operator
  let fruit = ["apple", "orange", "banana"];
  let vegetables = ["zucchini", "broccoli"];
  let food = ["rice", "wheat", ...fruit, ...vegetables];

  let count = (item, ...items) => {
    return items.length + 1;
  };

  expect(food).toEqual(["rice", "wheat", "apple", "orange", "banana", "zucchini", "broccoli"]);
  expect(count("mango", ...fruit)).toBe(4);
});
