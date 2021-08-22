export const factorial = (n: number): number => {
  let val = 1;

  for (let i = 2; i <= n; i++) {
    val *= i;
  }

  return val;
};

export const binomial = (n: number, k: number): number => {
  const numerator = factorial(n);
  const denominator = factorial(n - k) * factorial(k);

  return Math.floor(numerator / denominator);
};
