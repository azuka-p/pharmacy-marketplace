export default function sumArray(arr: number[]) {
  return arr.reduce((partialSum, a) => partialSum + a, 0);
}
