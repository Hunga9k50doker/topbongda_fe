//get last 10 years
const year = new Date().getFullYear();
let seasons: {
  title: string;
  value: number;
}[] = [];

for (let index = year; index > year - 10; index--) {
  seasons.push({ title: `${index} - ${index + 1}`, value: index });
}
export { seasons };
