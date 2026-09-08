// Q4. multiplication par facteur
export const sumAndMultiply = (factor, ...numbers) => {
  return numbers
    .map(num => num * factor)
    .reduce((sum, current) => sum + current, 0);
};