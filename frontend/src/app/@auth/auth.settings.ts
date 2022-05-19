import {environment} from '../../environments/environment';

export const socialLinks = [
    {
        url: 'https://github.com/akveo/nebular',
        target: '_blank',
        icon: 'github',
    },
    {
        url: 'https://www.facebook.com/akveo/',
        target: '_blank',
        icon: 'facebook',
    },
    {
        url: 'https://twitter.com/akveo_inc',
        target: '_blank',
        icon: 'twitter',
    },
];

export const authOptions = {
    name: 'email',
    baseEndpoint: environment.apiUrl,
    login: {
        endpoint: '/auth/login',
        method: 'post',
    },
    register: {
        endpoint: '/auth/sign-up',
        method: 'post',
    },
    logout: {
        endpoint: '/auth/sign-out',
        method: 'post',
    },
    requestPass: {
        endpoint: '/auth/request-pass',
        method: 'post',
    },
    otp: {
        endpoint: '/auth/otp',
        method: 'post',
    },
    resetPass: {
        endpoint: '/auth/reset-pass',
        method: 'post',
    },
    refreshToken: {
        endpoint: '/auth/refresh-token',
        method: 'post',
    },
    forms: {
        login: {
            socialLinks: socialLinks,
            redirectDelay: 4000,
        },
        logout: {
            redirectDelay: 4000,
        },
        register: {
            socialLinks: socialLinks,
            redirectDelay: 4000,
            terms: true
        },
        requestPassword: {
            redirectDelay: 4000,
        },
        resetPassword: {
            redirectDelay: 4000,
        },
        validation: {
            name: {
                required: true,
                minLength: 3,
                maxLength: 100,
            },
            domain: {
                required: true,
                minLength: 3,
                maxLength: 100,
            },
            email: {
                required: true,
            },
            password: {
                required: true,
                minLength: 6,
                maxLength: 20,
            },
            phone: {
                minLength: 10,
                maxLength: 12,
                required: false
            },
            rememberMe: {
                required: true
            }
        },
    },
};
