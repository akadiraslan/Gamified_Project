import * as authActions from '../actions/auth.actions';
import {User} from '../../model/user';
import {act} from '@ngrx/effects';

export interface State {
  user: User;
  role: string;
  isAuth: boolean;
  otp_token: string;
  errorMessage: string | null;

}

export const initialState: State = {
  user: null,
  role: localStorage.getItem('role'),
  isAuth: localStorage.getItem('token') !== null,
  otp_token: localStorage.getItem('confirmation_code'),
  errorMessage: null
};


export function reducer(state = initialState, action: authActions.AuthActions): State {
  switch (action.type) {
    case authActions.AuthActionTypes.LOGIN_SUCCESS:
      return handleSuccess(state, action);
    case authActions.AuthActionTypes.OTP_SUCCESS:
      return handleOtpSuccess(state, action);
    case authActions.AuthActionTypes.LOGIN_FAILURE:
      return handleFailure(state, action);
    case authActions.AuthActionTypes.LOGOUT:
      return initialState;


    default:
      return state;
  }
}

function handleSuccess(state: State, action: authActions.LoginSuccess): State {
  return {
    ...state,
    isAuth: true,
    user: action.payload,
    role: action.payload.role
  };
}

function handleOtpSuccess(state: State, action: authActions.OtpSuccess): State {
  return {
    ...state,
    isAuth: true,
    user: action.payload,
    role: action.payload.role
  };
}

function handleFailure(state: State, action: authActions.LoginFailure): State {
  return {
    ...state,
    errorMessage: action.payload.payload.error.message
  };


}

