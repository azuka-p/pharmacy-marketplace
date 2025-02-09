export default function DateFormatter(data: string) {
  const date = data.split(" ");
  const time = date[1].split(".");
  const transactionDate = date[0] + " " + time[0] + " " + date[3];

  return transactionDate;
}
