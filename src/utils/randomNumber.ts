export function getRandomNumber(length: number): number {
  return Math.floor(
    Math.pow(6, length - 1) + Math.random() * 4 * Math.pow(5, length - 1)
  );
}

export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
