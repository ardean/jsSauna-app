import { Dispatch } from "redux";
import authService from "./authService";

export interface AuthLoginSuccessAction {
  type: "AUTH_LOGIN_SUCCESS";
  sessionId: string;
}

export interface AuthLoginFailAction {
  type: "AUTH_LOGIN_FAIL";
}

type AuthLoginAction = AuthLoginSuccessAction | AuthLoginFailAction;

export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthLoginAction>): Promise<AuthLoginAction> => {
  const sessionId = await authService.login(username, password);
  if (sessionId === false) {
    return await dispatch({
      type: "AUTH_LOGIN_FAIL"
    });
  }

  return await dispatch({
    type: "AUTH_LOGIN_SUCCESS",
    sessionId
  });
};

export interface AuthLogoutSuccessAction {
  type: "AUTH_LOGOUT_SUCCESS";
}

type AuthLogoutAction = AuthLogoutSuccessAction;

export const logout = () => async (dispatch: Dispatch<AuthLogoutAction>): Promise<AuthLogoutSuccessAction> => {
  await authService.logout();

  return await dispatch({
    type: "AUTH_LOGOUT_SUCCESS"
  });
};

export type AuthAction =
  AuthLoginAction |
  AuthLogoutAction;