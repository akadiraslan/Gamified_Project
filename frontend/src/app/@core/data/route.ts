export const Route = {
    ADMIN: {
        GET_ALL: 'admin/getAllUser',
        PROFILE: '/admin/profile'
    },
    GET_USER: '/',
    PROFILE: '/profile',
    UPLOAD: '/games/upload-game',
    DELETE_FILE: '/games/delete-file-game',
    DELETE: '/games/delete',
    TAGS: '/tags',
    THEMES: '/themes',
    PACKAGES: '/packages',
    CHECKOUT: '/checkout',
    SECRET_KEY: '/get-key',
    SAVE_CREDIT_CARD: '/save-credit-card',
    DELETE_CREDIT_CARD: '/delete-credit-card',
    GET_CREDIT_CARDS: '/get-credit-cards',
    SAVE_ADDRESS: '/accounts/save-address',
    UPDATE_ADDRESS: '/accounts/update-address',
    DELETE_ADDRESS: '/accounts/delete-address',
    GET_ADDRESS: '/get-all-address',
    PACKAGES_BOUGHT: '/payment-history',
    CATEGORIES: '/categories',
    GIFTS: '/gifts',
    GAMES: '/games',
    ORGANISATIONS: '/organisations',
    ACCOUNT: '/accounts',
    ACCOUNT_SECURITY: '/accounts/update-security',
    SCORM_DOWNLOAD: '/scorm/download',
    CHECK_GAME: '/check-game',
    LEARNER: '/get-learners',
    USERGAMES: '/get-user-games',
    USERS: '/users',
    REPORT: {
        ORGANISATION_GENERAL_REPORT: '/report/general-report',
        GAME_REPORT: '/report/game-report',
        GAME_DETAIL_REPORT: '/report/game-detail-report',
        BEST_LIST_REPORT: '/report/best-list-report',
        CATEGORY_GENERAL_REPORT: '/report/category-general-report',
        QUESTION_GENERAL_REPORT: '/report/question-general-report',
        LEARNER_GENERAL_REPORT: '/report/learner-general-report',
    }
    ,
    PUBLIC: {
        GET: '/getPublic',
        LOGIN: '/auth/login',
        REGISTER: '/auth/register'
    },
    DASHBOARD: '/games',
    USER_PACKAGES: '/user/packages',
    GET_BILLING: '/get-billing',

};
