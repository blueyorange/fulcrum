export default function html(strings, ...values) {
  console.log(strings, values);
  return strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ``}`);
}
