interface StatusTemperatureChangedAction {
  type: "STATUS_TEMPERATURE_CHANGED";
  temperature: number;
}

type StatusTemperatureChangeAction = StatusTemperatureChangedAction;

interface StatusHumidityChangedAction {
  type: "STATUS_HUMIDITY_CHANGED";
  humidity: number;
}

type StatusHumidityChangeAction = StatusHumidityChangedAction;

interface StatusHeatingChangedAction {
  type: "STATUS_HEATING_CHANGED";
  heating: boolean;
}

type StatusHeatingChangeAction = StatusHeatingChangedAction;

export type StatusAction =
  StatusTemperatureChangeAction |
  StatusHumidityChangeAction |
  StatusHeatingChangeAction;