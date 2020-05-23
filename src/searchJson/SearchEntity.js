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
          ENTITY.Tickets,
          [{ searchKey: 'organization_id', searchTerm: item._id }],
          true,
          ['subject']
        );

        const users = await searchInJson(
          ENTITY.Users,
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
          ENTITY.Tickets,
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
            ENTITY.Organizations,
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
          ENTITY.Users,
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
            ENTITY.Organizations,
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
