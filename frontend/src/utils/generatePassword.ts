export default function generatePassword() {
  const numberChars = "0123456789";
  const symbolChars = '"!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~”';
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const allChars = numberChars + symbolChars + upperChars + lowerChars;
  let randPasswordArray: string[] = Array(10);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray[3] = symbolChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);

  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    }),
  ).join("");
}

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
