export default async function readFile(entity) {
  try {
    const { default: json } = await import(`../assets/${entity}.json`);
    return Promise.resolve(json);
  } catch (err) {
    return Promise.reject(err);
  }
}
