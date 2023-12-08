import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // comingSoon: '/coming-soon',
  // maintenance: '/maintenance',
  // pricing: '/pricing',
  // payment: '/payment',
  // about: '/about-us',
  // contact: '/contact-us',
  // faqs: '/faqs',
  // page403: '/error/403',
  // page404: '/error/404',
  // page500: '/error/500',
  // components: '/components',
  // docs: 'https://docs.minimals.cc',
  // changelog: 'https://docs.minimals.cc/changelog',
  // zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  // minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  // figma:
  //   'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  // product: {
  //   root: `/product`,
  //   checkout: `/product/checkout`,
  //   details: (id) => `/product/${id}`,
  //   demo: {
  //     details: `/product/${MOCK_ID}`,
  //   },
  // },
  // post: {
  //   root: `/post`,
  //   details: (title) => `/post/${paramCase(title)}`,
  //   demo: {
  //     details: `/post/${paramCase(MOCK_TITLE)}`,
  //   },
  // },
  // AUTH
  auth: {
    // amplify: {
    //   login: `${ROOTS.AUTH}/amplify/login`,
    //   verify: `${ROOTS.AUTH}/amplify/verify`,
    //   register: `${ROOTS.AUTH}/amplify/register`,
    //   newPassword: `${ROOTS.AUTH}/amplify/new-password`,
    //   forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    // },
    jwt: {
      // login: `${ROOTS.AUTH}/jwt/login`,
      // register: `${ROOTS.AUTH}/jwt/register`,
    },
    // firebase: {
    //   login: `${ROOTS.AUTH}/firebase/login`,
    //   verify: `${ROOTS.AUTH}/firebase/verify`,
    //   register: `${ROOTS.AUTH}/firebase/register`,
    //   forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    // },
    // auth0: {
    //   login: `${ROOTS.AUTH}/auth0/login`,
    // },
  },
  // authDemo: {
  //   classic: {
  //     login: `${ROOTS.AUTH_DEMO}/classic/login`,
  //     register: `${ROOTS.AUTH_DEMO}/classic/register`,
  //     forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
  //     newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
  //     verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
  //   },
  //   modern: {
  //     login: `${ROOTS.AUTH_DEMO}/modern/login`,
  //     register: `${ROOTS.AUTH_DEMO}/modern/register`,
  //     forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
  //     newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
  //     verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
  //   },
  // },
  login: {
    root: '/login'
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}`,
    // mail: `${ROOTS.DASHBOARD}/mail`,
    // chat: `${ROOTS.DASHBOARD}/chat`,
    // blank: `${ROOTS.DASHBOARD}/blank`,
    // kanban: `${ROOTS.DASHBOARD}/kanban`,
    // calendar: `${ROOTS.DASHBOARD}/calendar`,
    // fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    // permission: `${ROOTS.DASHBOARD}/permission`,
    // general: {
    //   app: `${ROOTS.DASHBOARD}/app`,
    //   ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
    //   analytics: `${ROOTS.DASHBOARD}/analytics`,
    //   banking: `${ROOTS.DASHBOARD}/banking`,
    //   booking: `${ROOTS.DASHBOARD}/booking`,
    //   file: `${ROOTS.DASHBOARD}/file`,
    // },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      professionals: `${ROOTS.DASHBOARD}/user/professionals`,
      producers: `${ROOTS.DASHBOARD}/user/producers`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    events: {
      root: `${ROOTS.DASHBOARD}/events`,
      new: `${ROOTS.DASHBOARD}/events/new`,
      list: `${ROOTS.DASHBOARD}/events/list`,
      cards: `${ROOTS.DASHBOARD}/events/cards`,
      profile: `${ROOTS.DASHBOARD}/events/profile`,
      account: `${ROOTS.DASHBOARD}/events/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/events/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/events/${MOCK_ID}/edit`,
      },
    },
    classified: {
      root: `${ROOTS.DASHBOARD}/classified`,
      new: `${ROOTS.DASHBOARD}/classified/new`,
      list: `${ROOTS.DASHBOARD}/classified/list`,
      cards: `${ROOTS.DASHBOARD}/classified/cards`,
      profile: `${ROOTS.DASHBOARD}/classified/profile`,
      account: `${ROOTS.DASHBOARD}/classified/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/classified/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/classified/${MOCK_ID}/edit`,
      },
    },
    vendor: {
      root: `${ROOTS.DASHBOARD}/vendor`,
      new: `${ROOTS.DASHBOARD}/vendor/new`,
      list: `${ROOTS.DASHBOARD}/vendor/list`,
      cards: `${ROOTS.DASHBOARD}/vendor/cards`,
      profile: `${ROOTS.DASHBOARD}/vendor/profile`,
      account: `${ROOTS.DASHBOARD}/vendor/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/vendor/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/vendor/${MOCK_ID}/edit`,
      },
    },
    gigs: {
      root: `${ROOTS.DASHBOARD}/gigs`,
      new: `${ROOTS.DASHBOARD}/gigs/new`,
      list: `${ROOTS.DASHBOARD}/gigs/list`,
      cards: `${ROOTS.DASHBOARD}/gigs/cards`,
      profile: `${ROOTS.DASHBOARD}/gigs/profile`,
      account: `${ROOTS.DASHBOARD}/gigs/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/gigs/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/gigs/${MOCK_ID}/edit`,
      },
    },
    moderator: {
      root: `${ROOTS.DASHBOARD}/moderator`,
      new: `${ROOTS.DASHBOARD}/moderator/new`,
      list: `${ROOTS.DASHBOARD}/moderator/list`,
      cards: `${ROOTS.DASHBOARD}/moderator/cards`,
      profile: `${ROOTS.DASHBOARD}/moderator/profile`,
      account: `${ROOTS.DASHBOARD}/moderator/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/moderator/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/moderator/${MOCK_ID}/edit`,
      },
    },
    // product: {
    //   root: `${ROOTS.DASHBOARD}/product`,
    //   new: `${ROOTS.DASHBOARD}/product/new`,
    //   details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
    //     edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
    //   },
    // },
    // invoice: {
    //   root: `${ROOTS.DASHBOARD}/invoice`,
    //   new: `${ROOTS.DASHBOARD}/invoice/new`,
    //   details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
    //     edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
    //   },
    // },
    // post: {
    //   root: `${ROOTS.DASHBOARD}/post`,
    //   new: `${ROOTS.DASHBOARD}/post/new`,
    //   details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
    //   edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
    //     edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
    //   },
    // },
    // order: {
    //   root: `${ROOTS.DASHBOARD}/order`,
    //   details: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
    //   },
    // },
    // job: {
    //   root: `${ROOTS.DASHBOARD}/job`,
    //   new: `${ROOTS.DASHBOARD}/job/new`,
    //   details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
    //     edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
    //   },
    // },
    // tour: {
    //   root: `${ROOTS.DASHBOARD}/tour`,
    //   new: `${ROOTS.DASHBOARD}/tour/new`,
    //   details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
    //     edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
    //   },
    // },
  },
};
