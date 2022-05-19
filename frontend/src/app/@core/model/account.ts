import {Package} from './package';

export class Security {
    domainName: string;
    email: string;
    password: string;
    organisation: Organisation;
}

export class Profile {
    name: string;
    surname: string;
    phone_number: string;
    organisation: Organisation;
    phone: string;
    organisationName: string;
}

export class Organisation {
    id: number;
    name: string;
    domain: string;
    license_start_date: string;
    license_end_date: string;
    package: Package;
    status: string;
}



