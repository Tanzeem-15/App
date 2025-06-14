export interface LoginDetails {
  userName?: string;
  pin_1?: string;
  pin_2?: string;
  pin_3?: string;
  pin_4?: string;
}

export interface LoginState {
  isLogin: boolean;
  loginDetails: LoginDetails;
}

const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

interface SetLoginStatusAction {
  type: typeof SET_LOGIN_STATUS;
  payload: { flag: boolean; details: LoginDetails };
}

export type LoginActionTypes = SetLoginStatusAction;

export const setLoginStatus = (
  flag: boolean,
  details: LoginDetails,
): SetLoginStatusAction => ({
  type: SET_LOGIN_STATUS,
  payload: { flag, details },
});

const initialState: LoginState = {
  isLogin: false,
  loginDetails: {},
};

export const loginReducer = (
  state = initialState,
  action: LoginActionTypes,
): LoginState => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLogin: action.payload.flag,
        loginDetails: action.payload.details,
      };
    default:
      return state;
  }
};
