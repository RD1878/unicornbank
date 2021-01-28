export function getRandomNumber(length: number): number {
  return Math.floor(
    Math.pow(6, length - 1) + Math.random() * 4 * Math.pow(5, length - 1)
  );
}
