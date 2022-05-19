import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Authentication] Login',
  LOGIN_SUCCESS = '[Authentication] Login Success',
  LOGIN_FAILURE = '[Authentication] Login Failure',
  OTP = '[Authentication] Otp',
  OTP_SUCCESS = '[Authentication] Otp Success',
  OTP_FAILURE = '[Authentication] Otp Failure',
  LOGOUT = '[Authentication] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Otp implements Action {
  readonly type = AuthActionTypes.OTP;
  constructor(public payload: any) {}
}

export class OtpSuccess implements Action {
  readonly type = AuthActionTypes.OTP_SUCCESS;
  constructor(public payload: any) {}
}

export class OtpFailure implements Action {
  readonly type = AuthActionTypes.OTP_FAILURE;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor(public payload: any) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Otp
  | OtpSuccess
  | OtpFailure
  | Logout ;
