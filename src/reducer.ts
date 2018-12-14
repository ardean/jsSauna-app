import { AppAction } from "./actions";
import { combineReducers, Reducer } from "redux";

export interface AppState {
  sessionId: string;
  loading: boolean;
  loginError: string;
  loginRequired: boolean;
  heating: boolean;
  temperature: number;
  humidity: number;
  maxTemperature: number;
  on: boolean;
  targetTemperature: number;
}

const reducer: Reducer<AppState, AppAction> = combineReducers<AppState, AppAction>({
  sessionId: (state: string = "", action: AppAction) => {
    switch (action.type) {
      case "AUTH_LOGIN_SUCCESS":
        return action.sessionId;
      case "AUTH_LOGOUT_SUCCESS":
        return "";
      case "CHECK_SUCCESS":
        return !action.status.loggedIn ? "" : state;
    }
    return state;
  },
  loading: (state: boolean = false, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return false;
    }
    return state;
  },
  loginError: (state: string = "", action: AppAction) => {
    switch (action.type) {
      case "AUTH_LOGIN_FAIL":
        return "Login failed";
      case "AUTH_LOGIN_SUCCESS":
        return "";
    }
    return state;
  },
  loginRequired: (state: boolean = true, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.status.loginRequired;
    }
    return state;
  },
  heating: (state: boolean = false, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.status.heating;
      case "STATUS_HEATING_CHANGED":
        return action.heating;
    }
    return state;
  },
  temperature: (state: number = null, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.status.temperature;
      case "STATUS_TEMPERATURE_CHANGED":
        return action.temperature;
    }
    return state;
  },
  humidity: (state: number = null, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.status.humidity;
      case "STATUS_HUMIDITY_CHANGED":
        return action.humidity;
    }
    return state;
  },
  maxTemperature: (state: number = null, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.status.maxTemperature;
    }
    return state;
  },
  on: (state: boolean = false, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.settings.on;
      case "SETTINGS_ON_CHANGED":
        return action.on;
    }
    return state;
  },
  targetTemperature: (state: number = null, action: AppAction) => {
    switch (action.type) {
      case "CHECK_SUCCESS":
        return action.settings.targetTemperature;
      case "SETTINGS_TARGET_TEMPERATURE_CHANGED":
        return action.targetTemperature;
    }
    return state;
  }
});

export default reducer;