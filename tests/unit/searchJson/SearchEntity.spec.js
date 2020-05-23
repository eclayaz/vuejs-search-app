import searchEntity from '@/searchJson/SearchEntity.js';
jest.mock('@/searchJson/ReadJsonFile.js');
import readFile from '@/searchJson/ReadJsonFile.js';

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

const userJson = [
  {
    _id: 1,
    url: 'http://initech.tokoin.io.com/api/v2/users/1.json',
    external_id: '74341f74-9c79-49d5-9611-87ef9b6eb75f',
    name: 'Francisca Rasmussen',
    alias: 'Miss Coffey',
    created_at: '2016-04-15T05:19:46 -10:00',
    active: true,
    verified: true,
    shared: false,
    locale: 'en-AU',
    timezone: 'Sri Lanka',
    last_login_at: '2013-08-04T01:03:27 -10:00',
    email: 'coffeyrasmussen@flotonic.com',
    phone: '8335-422-718',
    signature: "Don't Worry Be Happy!",
    organization_id: 113,
    tags: ['Springville', 'Sutton', 'Hartsville/Hartley', 'Diaperville'],
    suspended: true,
    role: 'admin',
  },
  {
    _id: 2,
    url: 'http://initech.tokoin.io.com/api/v2/users/2.json',
    external_id: 'c9995ea4-ff72-46e0-ab77-dfe0ae1ef6c2',
    name: 'Cross Barlow',
    alias: 'Miss Joni',
    created_at: '2016-06-23T10:31:39 -10:00',
    active: false,
    verified: true,
    shared: false,
    locale: 'zh-CN',
    timezone: 'Armenia',
    last_login_at: '2012-04-12T04:03:28 -10:00',
    email: 'jonibarlow@flotonic.com',
    phone: '9575-552-585',
    signature: "Don't Worry Be Happy!",
    organization_id: 106,
    tags: ['Foxworth', 'Woodlands', 'Herlong', 'Henrietta'],
    suspended: false,
    role: 'admin',
  },
];

const ticketsJson = [
  {
    _id: '436bf9b0-1147-4c0a-8439-6f79833bff5b',
    url:
      'http://initech.tokoin.io.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json',
    external_id: '9210cdc9-4bee-485f-a078-35396cd74063',
    created_at: '2016-04-28T11:19:34 -10:00',
    type: 'incident',
    subject: 'A Catastrophe in Korea (North)',
    description:
      'Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.',
    priority: 'high',
    status: 'pending',
    submitter_id: 1,
    assignee_id: 24,
    organization_id: 116,
    tags: [
      'Ohio',
      'Pennsylvania',
      'American Samoa',
      'Northern Mariana Islands',
    ],
    has_incidents: false,
    due_at: '2016-07-31T02:37:50 -10:00',
    via: 'web',
  },
  {
    _id: '1a227508-9f39-427c-8f57-1b72f3fab87c',
    url:
      'http://initech.tokoin.io.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json',
    external_id: '3e5ca820-cd1f-4a02-a18f-11b18e7bb49a',
    created_at: '2016-04-14T08:32:31 -10:00',
    type: 'incident',
    subject: 'A Catastrophe in Micronesia',
    description:
      'Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.',
    priority: 'low',
    status: 'hold',
    submitter_id: 71,
    assignee_id: 1,
    organization_id: 112,
    tags: ['Puerto Rico', 'Idaho', 'Oklahoma', 'Louisiana'],
    has_incidents: false,
    due_at: '2016-08-15T05:37:32 -10:00',
    via: 'chat',
  },
  {
    _id: '2217c7dc-7371-4401-8738-0a8a8aedc08d',
    url:
      'http://initech.tokoin.io.com/api/v2/tickets/2217c7dc-7371-4401-8738-0a8a8aedc08d.json',
    external_id: '3db2c1e6-559d-4015-b7a4-6248464a6bf0',
    created_at: '2016-07-16T12:05:12 -10:00',
    type: 'problem',
    subject: 'A Catastrophe in Hungary',
    description:
      'Ipsum fugiat voluptate reprehenderit cupidatat aliqua dolore consequat. Consequat ullamco minim laboris veniam ea id laborum et eiusmod excepteur sint laborum dolore qui.',
    priority: 'normal',
    status: 'closed',
    submitter_id: 9,
    assignee_id: 65,
    organization_id: 105,
    tags: ['Massachusetts', 'New York', 'Minnesota', 'New Jersey'],
    has_incidents: true,
    due_at: '2016-08-06T04:16:06 -10:00',
    via: 'web',
  },
];

const organizationJson = [
  {
    _id: 112,
    url: 'http://initech.tokoin.io.com/api/v2/organizations/112.json',
    external_id: '32e979ff-47b4-43b9-8b74-eea1227905d9',
    name: 'Quilk',
    domain_names: [
      'valreda.com',
      'strozen.com',
      'signity.com',
      'quantasis.com',
    ],
    created_at: '2016-01-10T03:21:25 -11:00',
    details: 'MegaCorp',
    shared_tickets: false,
    tags: ['Hall', 'Dorsey', 'Shepard', 'Carter'],
  },
  {
    _id: 113,
    url: 'http://initech.tokoin.io.com/api/v2/organizations/113.json',
    external_id: '67d9dbdb-a9c6-4a30-a003-202de05d09e2',
    name: 'Noralex',
    domain_names: ['artiq.com', 'mazuda.com', 'surelogic.com', 'fuelworks.com'],
    created_at: '2016-04-09T08:45:29 -10:00',
    details: 'MegaCörp',
    shared_tickets: true,
    tags: ['Maldonado', 'Hebert', 'Poole', 'Mcleod'],
  },
];

describe('search users', () => {
  const entity = 'users';

  it('empty user list', async () => {
    const searchKey = '_id';
    const searchTerm = '123';

    readFile.mockImplementation(() => []);

    const userList = await searchEntity(entity, searchKey, searchTerm);
    expect(readFile()).toEqual([]);
    expect(userList).toEqual([]);
  });

  it('should return correct user', async () => {
    const searchKey = '_id';
    const searchTerm = '1';

    readFile.mockImplementation(() => userJson);

    const userList = await searchEntity(entity, searchKey, searchTerm);
    expect(readFile()).toEqual(userJson);
    expect(userList).toEqual([
      { ...userJson[0], organization: [], tickets: [] },
    ]);
  });

  it('search with bool', async () => {
    const searchKey = 'active';
    const searchTerm = false;

    readFile.mockImplementation(() => userJson);

    const userList = await searchEntity(entity, searchKey, searchTerm);
    expect(readFile()).toEqual(userJson);
    expect(userList).toEqual([
      { ...userJson[1], organization: [], tickets: [] },
    ]);
  });

  it('search with value inside an array', async () => {
    const searchKey = 'tags';
    const searchTerm = 'Woodlands';

    readFile.mockImplementation(() => userJson);

    const userList = await searchEntity(entity, searchKey, searchTerm);
    expect(readFile()).toEqual(userJson);
    expect(userList).toEqual([
      { ...userJson[1], organization: [], tickets: [] },
    ]);
  });

  it('get the correct additional details', async () => {
    const searchKey = '_id';
    const searchTerm = 1;

    const expectedResult = [
      {
        _id: 1,
        active: true,
        alias: 'Miss Coffey',
        created_at: '2016-04-15T05:19:46 -10:00',
        email: 'coffeyrasmussen@flotonic.com',
        external_id: '74341f74-9c79-49d5-9611-87ef9b6eb75f',
        last_login_at: '2013-08-04T01:03:27 -10:00',
        locale: 'en-AU',
        name: 'Francisca Rasmussen',
        organization: [
          {
            name: 'Noralex',
          },
        ],
        organization_id: 113,
        phone: '8335-422-718',
        role: 'admin',
        shared: false,
        signature: "Don't Worry Be Happy!",
        suspended: true,
        tags: ['Springville', 'Sutton', 'Hartsville/Hartley', 'Diaperville'],
        tickets: [
          {
            subject: 'A Catastrophe in Korea (North)',
          },
          {
            subject: 'A Catastrophe in Micronesia',
          },
        ],
        timezone: 'Sri Lanka',
        url: 'http://initech.tokoin.io.com/api/v2/users/1.json',
        verified: true,
      },
    ];

    readFile
      .mockImplementationOnce(() => userJson)
      .mockImplementationOnce(() => ticketsJson)
      .mockImplementationOnce(() => organizationJson);

    const userList = await searchEntity(entity, searchKey, searchTerm);
    expect(userList).toEqual(expectedResult);
  });
});
