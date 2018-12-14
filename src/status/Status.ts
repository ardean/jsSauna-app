export default interface Status {
  temperature: number;
  maxTemperature: number;
  humidity: number;
  heating: boolean;
  loginRequired: boolean;
  loggedIn?: boolean;
}