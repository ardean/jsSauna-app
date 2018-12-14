import api from "./api";
import Status from "./status/Status";
import { Dispatch } from "redux";
import Settings from "./settings/Settings";
import { AuthAction } from "./auth/authActions";
import { StatusAction } from "./status/statusActions";
import { SettingsAction } from "./settings/settingsActions";

export interface CheckSuccessAction {
  type: "CHECK_SUCCESS";
  settings: Settings;
  status: Status;
}

export const check = (sessionId?: string) => async (dispatch: Dispatch<CheckSuccessAction>): Promise<CheckSuccessAction> => {
  const { settings, status } = await api.check(sessionId);

  return await dispatch({
    type: "CHECK_SUCCESS",
    settings,
    status
  });
};

type CheckAction = CheckSuccessAction;

export type AppAction = CheckAction | AuthAction | StatusAction | SettingsAction;