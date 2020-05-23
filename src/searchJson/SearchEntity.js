import searchInJson from './SearchJsonData';

const ENTITY = Object.freeze({
  Organizations: 'organizations',
  Users: 'users',
  Tickets: 'tickets',
});

export default async function searchEntity(entity, searchKey, searchTerm) {
  try {
    let data = await searchInJson(entity, [{ searchKey, searchTerm }], true);
    data = await fillUpAdditionalData(entity, data);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const fillUpAdditionalData = async function(entity, data) {
  if (entity === ENTITY.Organizations) {
    return fillOrganizationAdditionalData(data);
  }

  if (entity === ENTITY.Users) {
    return fillUserAdditionalData(data);
  }

  if (entity === ENTITY.Tickets) {
    return fillTicketAdditionalData(data);
  }
  return Promise.resolve(data);
};

const fillOrganizationAdditionalData = async function(data) {
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
};

const fillUserAdditionalData = async function(data) {
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
};

const fillTicketAdditionalData = async function(data) {
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
};
