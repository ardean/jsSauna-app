import { Store } from "redux";
import transport from "../transport";
import { AppState } from "../reducer";
import { AppAction } from "../actions";

class SettingsApi {
  baseName: string = "settings";

  init(store: Store<AppState, AppAction>) {
    transport.socket
      .on("onChange", (on: boolean) => {
        store.dispatch({
          type: "SETTINGS_ON_CHANGED",
          on
        });
      })
      .on("targetTemperatureChange", (targetTemperature: number) => {
        store.dispatch({
          type: "SETTINGS_TARGET_TEMPERATURE_CHANGED",
          targetTemperature
        });
      });
  }

  async changeTargetTemperature(targetTemperature: number) {
    return await transport.call(`${this.baseName}.changeTargetTemperature`, targetTemperature);
  }

  async changeOn(on: boolean) {
    return await transport.call(`${this.baseName}.changeOn`, on);
  }
}

export default new SettingsApi();