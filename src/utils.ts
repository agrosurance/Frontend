export function clamp(value: number, options: { min?: number; max?: number }) {
  let ans = value;
  if (options.min && ans < options.min) {
    ans = options.min;
  }
  if (options.max && ans > options.max) {
    ans = options.max;
  }
  return ans;
}
