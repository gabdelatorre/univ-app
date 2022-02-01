import * as universities from '../redux/modules/universities/reducers';

export const MOCK_TEST_DATA = {
  firebase: {
    auth: {
      uid: '123',
    },
  },
  firestore: {
    data: {
      users: {
        '123': {
          email: 'test@test.com',
          favourites: [] as string[],
          isSubscribed: false,
        },
      },
    },
  },
  universities: {
    ...universities.initialState,
    currentCountry: 'Philippines',
    universities: [
      {
        alpha_two_code: 'PH',
        country: 'Philippines',
        domains: ['adamson.edu.ph'],
        name: 'Adamson University',
        'state-province': '',
        web_pages: ['http://www.adamson.edu.ph/'],
      },
      {
        alpha_two_code: 'PH',
        country: 'Philippines',
        domains: ['addu.edu.ph'],
        name: 'Ateneo de Davao University',
        'state-province': '',
        web_pages: ['http://www.addu.edu.ph/'],
      },
      {
        alpha_two_code: 'PH',
        country: 'Philippines',
        domains: ['admu.edu.ph'],
        name: 'Ateneo de Manila University',
        'state-province': '',
        web_pages: ['http://www.admu.edu.ph/'],
      },
    ],
  },
};
