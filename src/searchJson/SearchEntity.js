export default async function searchEntity(entity, searchKey, searchTerm) {
  const resultShouldOnlyContains = ['_id', 'domain_names', 'name'];
  const data = await searchInJson(entity, [{ searchKey, searchTerm }], true);
  return Promise.resolve(cleanup(data, resultShouldOnlyContains));
}

const searchInJson = async function(entity, searchCriteria, multiple) {
  try {
    const data = await readFile(entity);

    if (multiple) {
      const result = data.filter((item) => {
        return isMatchingWithCriteria(item, searchCriteria);
      });
      return Promise.resolve(result);
    }

    const result = data.find((item) => {
      return isMatchingWithCriteria(item, searchCriteria);
    });
    return Promise.resolve([result]);
  } catch (err) {
    return Promise.reject(err);
  }
};

// This function works as OR condition
const isMatchingWithCriteria = function(item, criteria) {
  let found = false;
  for (const index in criteria) {
    if (item[criteria[index].searchKey] == criteria[index].searchTerm) {
      found = true;
      break;
    }
  }
  return found;
};

const readFile = async function(entity) {
  try {
    const { default: json } = await import(`../assets/${entity}.json`);
    return Promise.resolve(json);
  } catch (err) {
    return Promise.reject(err);
  }
};

const cleanup = function(items, shouldOnlyContains = []) {
  if (shouldOnlyContains.length === 0) {
    return items;
  }

  return items.map((item) => {
    let formattedItem = {};
    shouldOnlyContains.forEach((key) => {
      formattedItem[key] = item[key];
    });
    return formattedItem;
  });
};
