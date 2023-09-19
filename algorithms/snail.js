function snail(matrix) {
  const result = [];
  const n = matrix.length;

  let side = "top",
    top = 0,
    left = 0,
    bottom = n - 1,
    right = n - 1;

  while (true) {
    switch (side) {
      case "top":
        for (let i = left; i <= right; i++) {
          result.push(matrix[top][i]);
        }

        top++;
        side = "right";
        break;

      case "right":
        for (let i = top; i <= bottom; i++) {
          result.push(matrix[i][right]);
        }

        right--;
        side = "bottom";
        break;

      case "bottom":
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }

        bottom--;
        side = "left";
        break;

      case "left":
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }

        left++;
        side = "top";
        break;
    }

    if (left > right) {
      return result;
    }
  }
}

import { test } from "./test.js";

test(
  "should pass",
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
  [1, 2, 3, 6, 9, 8, 7, 4, 5]
);

test(
  "should pass",
  snail([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]),
  [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
);
