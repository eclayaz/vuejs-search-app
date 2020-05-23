export default async function searchEntity(entity, searchKey, searchTerm) {
  console.log(entity, searchKey, searchTerm);

  const data = await readFile(entity);
  return Promise.resolve(data);
}

const readFile = async function(entity) {
  try {
    const { default: json } = await import(`../assets/${entity}.json`);
    return Promise.resolve(json);
  } catch (err) {
    return Promise.reject(err);
  }
};
