// Q4. multiplication par facteur
export const sumAndMultiply = (factor: number, ...numbers: number[]): number => {
  return numbers
    .map((num: number) => num * factor)
    .reduce((sum: number, current: number) => sum + current, 0);
};