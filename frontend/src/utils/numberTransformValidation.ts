export default function NumberTransformValidation(val: string) {
  // TODO number validation
  const parsedValue = parseInt(val, 10);
  return isNaN(parsedValue) ? NaN : parsedValue;
}
