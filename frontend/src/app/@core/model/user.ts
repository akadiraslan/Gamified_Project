export class User {
    user: string;
    role: number;
    // tslint:disable-next-line:variable-name
    access_token: string;
    data: Data;
    success: boolean;
}

export class Data {
    // tslint:disable-next-line:variable-name
    access_token: string;
    email: string;
    // tslint:disable-next-line:variable-name
    confirmation_token: string;
    domain: string;
}
