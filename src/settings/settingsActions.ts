import { Dispatch } from "redux";
import settingsApi from "./settingsApi";

export interface SettingsOnChangedAction {
  type: "SETTINGS_ON_CHANGED";
  on: boolean;
}

type SettingsOnChangeAction = SettingsOnChangedAction;

export const changeOn = (on: boolean) => async (dispatch: Dispatch<SettingsOnChangeAction>): Promise<SettingsOnChangedAction> => {
  await settingsApi.changeOn(on);

  return await dispatch({
    type: "SETTINGS_ON_CHANGED",
    on
  });
};

export interface SettingsTargetTemperatureChangedAction {
  type: "SETTINGS_TARGET_TEMPERATURE_CHANGED";
  targetTemperature: number;
}

type SettingsTargetTemperatureChangeAction = SettingsTargetTemperatureChangedAction;

export const changeTargetTemperature = (targetTemperature: number) => async (dispatch: Dispatch<SettingsTargetTemperatureChangeAction>): Promise<SettingsTargetTemperatureChangedAction> => {
  await settingsApi.changeTargetTemperature(targetTemperature);

  return await dispatch({
    type: "SETTINGS_TARGET_TEMPERATURE_CHANGED",
    targetTemperature
  });
};

export type SettingsAction =
  SettingsOnChangeAction |
  SettingsTargetTemperatureChangeAction;