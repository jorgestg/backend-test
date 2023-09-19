function balancedGroupSymbols(expression) {
  const symbols = { "(": ")", "{": "}", "[": "]" };
  const stack = [];

  for (const symbol of expression) {
    if (symbol in symbols) {
      stack.push(symbol);
      continue;
    }

    if (symbols[stack.pop()] === symbol) {
      continue;
    }

    return false;
  }

  return true;
}

import { test } from "./test.js";

test("should pass", balancedGroupSymbols("[()]{}{()()}"), true);
test("should fail", balancedGroupSymbols("[(])"), false);
