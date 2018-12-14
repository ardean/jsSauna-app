import { Store } from "redux";
import transport from "../transport";
import { AppState } from "../reducer";
import { AppAction } from "../actions";

class StatusApi {
  init(store: Store<AppState, AppAction>) {
    transport.socket
      .on("heatingChange", (heating: boolean) => {
        store.dispatch({
          type: "STATUS_HEATING_CHANGED",
          heating
        });
      })
      .on("temperatureChange", (temperature: number) => {
        store.dispatch({
          type: "STATUS_TEMPERATURE_CHANGED",
          temperature
        });
      })
      .on("humidityChange", (humidity: number) => {
        store.dispatch({
          type: "STATUS_HUMIDITY_CHANGED",
          humidity
        });
      });
  }
}

export default new StatusApi();