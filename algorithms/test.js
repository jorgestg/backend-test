// Didn't want to bother with vitest or jest so I just did this
export function test(title, actual, expected) {
  if (!equals(expected, actual)) {
    throw new Error(`FAIL: Expected \`${expected}\` but got \`${actual}\``);
  }

  console.log("OK:", title);
}

function equals(left, right) {
  if (left === right) return true;

  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) return false;

    for (let i = 0; i < left.length; i++) {
      const l = left[i];
      const r = right[i];
      if (!equals(l, r)) return false;
    }

    return true;
  }

  return false;
}
