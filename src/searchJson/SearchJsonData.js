import readFile from '@/readJson/';

export default async function(
  entity,
  searchCriteria,
  multiple,
  resultShouldOnlyContains = []
) {
  try {
    const data = await readFile(entity);
    let result;
    if (multiple) {
      result = data.filter((item) => {
        return isMatchingWithCriteria(item, searchCriteria);
      });
    } else {
      result = data.find((item) => {
        return isMatchingWithCriteria(item, searchCriteria);
      });

      result = result === undefined ? [] : [result];
    }

    return Promise.resolve(cleanup(result, resultShouldOnlyContains));
  } catch (err) {
    return Promise.reject(err);
  }
}

// This function works as OR condition
const isMatchingWithCriteria = function(item, criteria) {
  let found = false;
  for (const index in criteria) {
    let value = item[criteria[index].searchKey];
    if (Array.isArray(value)) {
      if (value.includes(criteria[index].searchTerm)) {
        found = true;
        break;
      }
      continue;
    }

    // convert both values to string before compare
    if (value + '' === criteria[index].searchTerm + '') {
      found = true;
      break;
    }
  }
  return found;
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
