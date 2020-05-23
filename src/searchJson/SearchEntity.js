import readFile from './ReadJsonFile.js';

export default async function searchEntity(entity, searchKey, searchTerm) {
  try {
    let data = await searchInJson(entity, [{ searchKey, searchTerm }], true);
    data = await fillUpAdditionalData(entity, data);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const searchInJson = async function(
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
};

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

const fillUpAdditionalData = async function(entity, data) {
  if (entity === 'organizations') {
    return Promise.all(
      data.map(async (item) => {
        try {
          const tickets = await searchInJson(
            'tickets',
            [{ searchKey: 'organization_id', searchTerm: item._id }],
            true,
            ['subject']
          );

          const users = await searchInJson(
            'users',
            [{ searchKey: 'organization_id', searchTerm: item._id }],
            true,
            ['name']
          );

          return { ...item, tickets, users };
        } catch (err) {
          return Promise.reject(err);
        }
      })
    );
  } else if (entity === 'users') {
    return Promise.all(
      data.map(async (item) => {
        try {
          const tickets = await searchInJson(
            'tickets',
            [
              { searchKey: 'submitter_id', searchTerm: item._id },
              { searchKey: 'assignee_id', searchTerm: item._id },
            ],
            true,
            ['subject']
          );

          let organization = [];
          if (item.organization_id !== undefined) {
            organization = await searchInJson(
              'organizations',
              [{ searchKey: '_id', searchTerm: item.organization_id }],
              false,
              ['name']
            );
          }

          return { ...item, tickets, organization };
        } catch (err) {
          return Promise.reject(err);
        }
      })
    );
  } else if (entity === 'tickets') {
    return Promise.all(
      data.map(async (item) => {
        try {
          const tickets = await searchInJson(
            'users',
            [
              { searchKey: '_id', searchTerm: item.submitter_id },
              { searchKey: '_id', searchTerm: item.assignee_id },
            ],
            true,
            ['name']
          );

          let organization = [];
          if (item.organization_id !== undefined) {
            organization = await searchInJson(
              'organizations',
              [{ searchKey: '_id', searchTerm: item.organization_id }],
              false,
              ['name']
            );
          }

          return { ...item, tickets, organization };
        } catch (err) {
          return Promise.reject(err);
        }
      })
    );
  } else {
    return Promise.resolve(data);
  }
};
